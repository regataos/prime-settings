Name: regataos-prime
Version: 24.0
Release: 0
Url: https://github.com/regataos/prime-settings
Summary: PRIME for Regata OS.
Group: System/GUI/KDE
License: MIT
BuildRoot: %{_tmppath}/%{name}-%{version}-build
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
Requires: regataos-base >= 24
Requires: regataos-store >= 21.3
Requires: inxi
Requires: lshw
Requires: lshw-lang
Requires: xclip
Requires: radeontop
Requires: radeontop-lang
Requires: sensors
Requires: procps
Requires: sddm
Conflicts: suse-prime

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
if test -e "/opt/magma/nw"; then
  rm -f "/opt/magma/regataosprime"
  cp -f "/opt/magma/nw" "/opt/magma/regataosprime"
fi

if test ! -e "/usr/bin/regataosprime"; then
	ln -sf "/opt/magma/regataosprime" "/usr/bin/regataosprime"
fi

# Start systemd service
systemctl daemon-reload
systemctl enable --now prime-settings-systemd.service
systemctl enable --now detect-hybrid-graphics.service
systemctl enable --now set-configs-on-boot.service
systemctl --global enable check-hardware-resource-support.service

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

update-desktop-database

# Prepare the system for AMD AMF
#Some variables
amdgpu_version="22.20.5"
amf_amdgpu_pro="amf-amdgpu-pro_1.4.26-1511376~22.04_amd64.deb"
libamdenc_amdgpu_pro="libamdenc-amdgpu-pro_1.0-1518373.22.04_amd64.deb"
libamdenc_amdgpu_pro_legacy="libamdenc-amdgpu-pro_1.0-1511376~22.04_amd64.deb"
vulkan_amdgpu_pro="vulkan-amdgpu-pro_22.40-1518373.22.04_amd64.deb"

#Create directory to receive AMDGPU-PRO files
amdgpu_pro_dir="/opt/amdgpu-pro"

if test ! -e "$amdgpu_pro_dir/amd-amf"; then
  mkdir -p "$amdgpu_pro_dir/amd-amf"
fi

if test ! -e "$amdgpu_pro_dir/amd-amf-legacy"; then
  mkdir -p "$amdgpu_pro_dir/amd-amf-legacy"
fi

if test ! -e "$amdgpu_pro_dir/amd-vulkan"; then
  mkdir -p "$amdgpu_pro_dir/amd-vulkan"
fi

#Download the AMDGPU-PRO files
#AMD AMF
if test ! -e "$amdgpu_pro_dir/amd-amf/$amf_amdgpu_pro"; then
  wget --no-check-certificate -O "$amdgpu_pro_dir/amd-amf/$amf_amdgpu_pro" \
  "https://repo.radeon.com/amdgpu/$amdgpu_version/ubuntu/pool/proprietary/a/amf-amdgpu-pro/$amf_amdgpu_pro"

  #Prepare AMDGPU-PRO files
  cd "/$amdgpu_pro_dir/amd-amf/"
  ar -x "$amf_amdgpu_pro"
  tar xfv data.tar.xz

  #Clear cache
  rm -f "$amdgpu_pro_dir/amd-amf/control.tar.xz"
  rm -f "$amdgpu_pro_dir/amd-amf/data.tar.xz"
  rm -f "$amdgpu_pro_dir/amd-amf/debian-binary"
fi

#AMD Encode Core Library
if test ! -e "$amdgpu_pro_dir/amd-amf/$libamdenc_amdgpu_pro"; then
  wget --no-check-certificate -O "$amdgpu_pro_dir/amd-amf/$libamdenc_amdgpu_pro" \
  "https://repo.radeon.com/amdgpu/5.4.1/ubuntu/pool/proprietary/liba/libamdenc-amdgpu-pro/$libamdenc_amdgpu_pro"

  #Prepare AMDGPU-PRO files
  cd "/$amdgpu_pro_dir/amd-amf/"
  ar -x "$libamdenc_amdgpu_pro"
  tar xfv data.tar.xz

  #Clear cache
  rm -f "$amdgpu_pro_dir/amd-amf/control.tar.xz"
  rm -f "$amdgpu_pro_dir/amd-amf/data.tar.xz"
  rm -f "$amdgpu_pro_dir/amd-amf/debian-binary"
fi

#AMD Vulkan
if test ! -e "$amdgpu_pro_dir/amd-vulkan/$vulkan_amdgpu_pro"; then
  wget --no-check-certificate -O "$amdgpu_pro_dir/amd-vulkan/$vulkan_amdgpu_pro" \
  "https://repo.radeon.com/amdgpu/5.4.1/ubuntu/pool/proprietary/v/vulkan-amdgpu-pro/$vulkan_amdgpu_pro"

  #Prepare AMDGPU-PRO files
  cd "/$amdgpu_pro_dir/amd-vulkan/"
  ar -x "$vulkan_amdgpu_pro"
  tar xfv data.tar.xz

  #Prepare ICD files for AMDGPU-PRO Vulkan driver
  cp -f "/$amdgpu_pro_dir/amd-vulkan/opt/amdgpu-pro/etc/vulkan/icd.d/amd_icd64.json" "/$amdgpu_pro_dir/amd-vulkan/amd_icd64.json"
  sed -i 's|/opt/amdgpu-pro/lib/x86_64-linux-gnu/|/opt/amdgpu-pro/amd-vulkan/opt/amdgpu-pro/lib/x86_64-linux-gnu/|g' /$amdgpu_pro_dir/amd-vulkan/amd_icd64.json

  #Clear cache
  rm -f "$amdgpu_pro_dir/amd-vulkan/control.tar.xz"
  rm -f "$amdgpu_pro_dir/amd-vulkan/data.tar.xz"
  rm -f "$amdgpu_pro_dir/amd-vulkan/debian-binary"
fi

# Prepare the system for AMD AMF Legacy
#AMD AMF
if test ! -e "$amdgpu_pro_dir/amd-amf/$amf_amdgpu_pro"; then
  wget --no-check-certificate -O "$amdgpu_pro_dir/amd-amf/$amf_amdgpu_pro" \
  "https://repo.radeon.com/amdgpu/$amdgpu_version/ubuntu/pool/proprietary/a/amf-amdgpu-pro/$amf_amdgpu_pro"
fi

#Prepare files
if test ! -e "$amdgpu_pro_dir/amd-amf-legacy/$amf_amdgpu_pro"; then
  cp -f "$amdgpu_pro_dir/amd-amf/$amf_amdgpu_pro" "$amdgpu_pro_dir/amd-amf-legacy/$amf_amdgpu_pro"
  cd "/$amdgpu_pro_dir/amd-amf-legacy/"
  ar -x "$amf_amdgpu_pro"
  tar xfv data.tar.xz

  #Clear cache
  rm -f "$amdgpu_pro_dir/amd-amf-legacy/control.tar.xz"
  rm -f "$amdgpu_pro_dir/amd-amf-legacy/data.tar.xz"
  rm -f "$amdgpu_pro_dir/amd-amf-legacy/debian-binary"
fi

#AMD Encode Core Library
if test ! -e "$amdgpu_pro_dir/amd-amf-legacy/$libamdenc_amdgpu_pro_legacy"; then
  wget --no-check-certificate -O "$amdgpu_pro_dir/amd-amf-legacy/$libamdenc_amdgpu_pro_legacy" \
  "https://repo.radeon.com/amdgpu/$amdgpu_version/ubuntu/pool/proprietary/liba/libamdenc-amdgpu-pro/$libamdenc_amdgpu_pro_legacy"

  #Prepare AMDGPU-PRO files
  cd "/$amdgpu_pro_dir/amd-amf-legacy/"
  ar -x "$libamdenc_amdgpu_pro_legacy"
  tar xfv data.tar.xz

  #Clear cache
  rm -f "$amdgpu_pro_dir/amd-amf-legacy/control.tar.xz"
  rm -f "$amdgpu_pro_dir/amd-amf-legacy/data.tar.xz"
  rm -f "$amdgpu_pro_dir/amd-amf-legacy/debian-binary"
fi

%clean

%files
%defattr(-,root,root)
/opt/regataos-base
/opt/regataos-base/%{name}-%{version}.tar.xz

%changelog
