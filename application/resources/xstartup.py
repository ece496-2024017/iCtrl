XSTARTUP_STR = "\\n".join([
    "#\!/bin/sh",

    "xrdb $HOME/.Xresources || true",

    "vncconfig -nowin &",
    "autocutsel -fork || true",

    "unset SESSION_MANAGER",
    "unset DBUS_SESSION_BUS_ADDRESS",

    "/etc/X11/Xsession"
])
