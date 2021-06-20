%define service_name detect-hybrid-graphics
%define service_name3 intel-gpu-frequency
%define service_name4 intel-gpu-usage

Name: regataos-prime
Version: 12.2
Release: 0
Url: https://github.com/LinuxbuzzSoftware/prime-settings
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
#Source2: nvidia-modeset.conf
Requires: xz
Requires: magma >= 5.52.2-lp152.6.1
Requires: regataos-base >= 20.1.2-lp152.7.1
Requires: regataos-store >= 5.3-lp152.36.1
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
#cp -f %{SOURCE2} %{buildroot}/etc/modprobe.d/nvidia-modeset.conf

%post
if test -e /opt/regataos-base/%{name}-%{version}.tar.xz ; then
	tar xf /opt/regataos-base/%{name}-%{version}.tar.xz -C /
fi

# Fix permission for sudoers-prime-settings file
chown root:root /etc/sudoers.d/sudoers-prime-settings
chmod 600 /etc/sudoers.d/sudoers-prime-settings

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
%service_add_post %{service_name}.service
systemctl enable  %{service_name}.service || true
systemctl stop    %{service_name}.service || true
systemctl start   %{service_name}.service || true
systemctl restart %{service_name}.service || true

%service_add_post %{service_name3}.service
systemctl enable  %{service_name3}.service || true
systemctl stop    %{service_name3}.service || true
systemctl start   %{service_name3}.service || true
systemctl restart %{service_name3}.service || true

%service_add_post %{service_name4}.service
systemctl enable  %{service_name4}.service || true
systemctl stop    %{service_name4}.service || true
systemctl start   %{service_name4}.service || true
systemctl restart %{service_name4}.service || true

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

# Fix old installation
if test -e "/opt/regataos-prime/scripts/check-use-dgpu" ; then
  rm -f "/opt/regataos-prime/scripts/check-use-dgpu"
  rm -f "/etc/xdg/autostart/prime-settings-notifications.desktop"
  rm -f "/etc/xdg/autostart/run-dgpu-tray.desktop"
  rm -f "/etc/xdg/autostart/stop-dgpu-tray.desktop"
fi

update-desktop-database

%clean

%files
%defattr(-,root,root)
/opt/regataos-base
/opt/regataos-base/%{name}-%{version}.tar.xz
/etc/modprobe.d/
#/etc/modprobe.d/nvidia-modeset.conf

%changelog
