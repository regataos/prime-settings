#!/usr/bin/python

import os
import sys
import subprocess
from PyQt5.QtWidgets import QApplication, QSystemTrayIcon, QMenu
from PyQt5.QtGui import QIcon

app = QApplication(sys.argv)

# System tray icon information
icon = subprocess.Popen("echo $product", shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE).communicate()[0]
icon = str(icon.rstrip("\n") + ".png")
trayIcon = QSystemTrayIcon(QIcon(icon), parent=app)

# System tray title information
title = subprocess.Popen("./select-lang.sh", shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE).communicate()[0]
title = str(title.rstrip("\n"))
trayIcon.setToolTip(title)
trayIcon.show()

sys.exit(app.exec_())
