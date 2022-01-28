Name: regataos-prime
Version: 22.0
Release: 0
Url: https://github.com/regataos/prime-settings
Summary: PRIME for Regata OS.
Group: System/GUI/KDE
License: MIT
BuildRequires: xz
BuildRequires: desktop-file-utils
BuildRequires: update-desktop-files
BuildRequires: hicolor-icon-theme
BuildRequires: -post-build-checks
BuildRequires: systemd
BuildRequires: grep
Source1: %{name}-%{version}.tar.xz
Requires: xz
Requires: magma >= 5.54.1
Requires: regataos-store >= 21.3
Requires: inxi
Requires: lshw
Requires: lshw-lang
Requires: xclip
Requires: radeontop
Requires: radeontop-lang
Requires: sensors
Conflicts: suse-prime

BuildRoot: %{_tmppath}/%{name}-%{version}-build

%description
PRIME is a technology used to manage hybrid graphics found on recent laptops (Optimus for NVIDIA, AMD Dynamic Switchable Graphics for Radeon).
PRIME GPU offloading and Reverse PRIME is an attempt to support muxless hybrid graphics in the Linux kernel.

%build

%install
mkdir -p %buildroot/opt/regataos-base/
mkdir -p %buildroot/etc/modprobe.d/
cp -f %{SOURCE1} %{buildroot}/opt/regataos-base/%{name}-%{version}.tar.xz

%post
if test -e /opt/regataos-base/%{name}-%{version}.tar.xz ; then
	tar xf /opt/regataos-base/%{name}-%{version}.tar.xz -C /
fi

# Create the directory /tmp/regataos-prime
if test -e /tmp/regataos-prime ; then
	cd /tmp/
	chmod 777 regataos-prime
else
	cd /tmp/
	mkdir -p regataos-prime
	chmod 777 regataos-prime
fi

# Create regataosprime executable
if test ! -e /opt/magma/regataosprime ; then
	cp -f /opt/magma/magma /opt/magma/regataosprime
fi
if test ! -e /usr/bin/regataosprime ; then
	ln -sf /opt/magma/regataosprime /usr/bin/regataosprime
fi

# Start systemd service
%service_add_post detect-hybrid-graphics.service
systemctl enable  detect-hybrid-graphics.service || true
systemctl stop    detect-hybrid-graphics.service || true
systemctl start   detect-hybrid-graphics.service || true
systemctl restart detect-hybrid-graphics.service || true

%service_add_post set-configs-on-boot.service
systemctl enable  set-configs-on-boot.service || true
systemctl stop    set-configs-on-boot.service || true
systemctl start   set-configs-on-boot.service || true
systemctl restart set-configs-on-boot.service || true

if test -e /tmp/regataos-prime/use-hybrid-graphics.txt ; then
	# Open apps with hybrid graphics manually
	cp -f /opt/regataos-prime/all-files/prime-gpu.desktop /usr/share/kservices5/ServiceMenus/prime-gpu.desktop

	if test -e /usr/bin/nvidia-xconfig ; then
	  cp -f /opt/regataos-prime/all-files/10-intel-nvidia-drm-outputclass.conf  /etc/X11/xorg.conf.d/10-intel-nvidia-drm-outputclass.conf
	  cp -f /opt/regataos-prime/all-files/10-intel-nvidia-drm-outputclass.conf  /usr/share/X11/xorg.conf.d/10-intel-nvidia-drm-outputclass.conf
	  cp -f /opt/regataos-prime/all-files/10-amdgpu-nvidia-drm-outputclass.conf /etc/X11/xorg.conf.d/10-amdgpu-nvidia-drm-outputclass.conf
	  cp -f /opt/regataos-prime/all-files/10-amdgpu-nvidia-drm-outputclass.conf /usr/share/X11/xorg.conf.d/10-amdgpu-nvidia-drm-outputclass.conf
   else
	  rm -f "/etc/X11/xorg.conf.d/10-intel-nvidia-drm-outputclass.conf"
	  rm -f "/usr/share/X11/xorg.conf.d/10-intel-nvidia-drm-outputclass.conf"
	  rm -f "/etc/X11/xorg.conf.d/10-amdgpu-nvidia-drm-outputclass.conf"
	  rm -f "/usr/share/X11/xorg.conf.d/10-amdgpu-nvidia-drm-outputclass.conf"
   fi

elif test -e /tmp/regataos-prime/not-hybrid-graphics.txt ; then
	# Remove xorg config files
	rm -f "/etc/X11/xorg.conf.d/10-intel-nvidia-drm-outputclass.conf"
	rm -f "/usr/share/X11/xorg.conf.d/10-intel-nvidia-drm-outputclass.conf"
	rm -f "/etc/X11/xorg.conf.d/10-amdgpu-nvidia-drm-outputclass.conf"
	rm -f "/usr/share/X11/xorg.conf.d/10-amdgpu-nvidia-drm-outputclass.conf"

	rm -f "/usr/share/kservices5/ServiceMenus/prime-gpu.desktop"
else
    echo "Undetected Graphics"
	# Remove xorg config files
	rm -f "/etc/X11/xorg.conf.d/10-intel-nvidia-drm-outputclass.conf"
	rm -f "/usr/share/X11/xorg.conf.d/10-intel-nvidia-drm-outputclass.conf"
	rm -f "/etc/X11/xorg.conf.d/10-amdgpu-nvidia-drm-outputclass.conf"
	rm -f "/usr/share/X11/xorg.conf.d/10-amdgpu-nvidia-drm-outputclass.conf"

	rm -f "/usr/share/kservices5/ServiceMenus/prime-gpu.desktop"
fi

# Update system info
sudo /opt/regataos-prime/scripts/system-info.sh start

update-desktop-database

%clean

%files
%defattr(-,root,root)
/opt/regataos-base
/opt/regataos-base/%{name}-%{version}.tar.xz

%changelog
