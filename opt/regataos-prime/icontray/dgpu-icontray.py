#!/usr/bin/python3.11

import os
import sys
from PyQt6.QtWidgets import QApplication, QSystemTrayIcon, QMenu
from PyQt6.QtGui import QIcon

app = QApplication(sys.argv)

# System tray icon information
icon = os.popen('echo $product')
icon = icon.read().rstrip('\n')
trayIcon = QSystemTrayIcon(QIcon(icon), parent=app)

# System tray title information
title = os.popen('/opt/regataos-prime/icontray/select-lang.sh')
title = title.read().rstrip('\n')
trayIcon.setToolTip(title)
trayIcon.show()

sys.exit(app.exec())
