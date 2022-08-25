Here you can find on how the codes work together.

First of all all you have to do is to download all your files on your Raspberry Pi in a same folder.
Once you have done that I will explain the codes.

# Python code

In this code, it creates the server in order to load all the html files. Also it has 2 ports available to enable both the control and the real-time camera 
to work at the same time.

If you want to use it on your raspberry you may have to change the IP adress. Here is the IP adress of my personal Raspberry Pi.

You can find on the root "/" the interface of a computer. On the "/get_frame" you can access to the real-time camera. And on the "/phone" you can have the
interface of a phone.

# Linked code

You have 3 differents parts of codes:

#On the root
For the root (computer side), you have the "index.html" that is link to the "script.js" and the "style.css".
The script.js is quite long but is all an iteration of all the possible actions enable for the airship (all the directions)

#Camera
For the camera, the code is simple. It is only a html code "cam.html". All the complex part of having a real-time camera is inside the python code

#Phone
For the phone side, you have the "game_joysticks.html" and "game_joysticks.js". The javascript file is creating the two joystick controllable together 
at the same time. It also include a small interface to understand the movements your making.
This interface is also compatible with a computer and a controller.

# Make it work with the Raspberry Pi

#Access Point
First of all, you have to put your Raspberry Pi on Access Point (no need to have a wifi connection). 
In order to complete this part i use this website: https://thepi.io/how-to-use-your-raspberry-pi-as-a-wireless-access-point/
You can skip the part wher it connect to the wifi (from step 6)
You have to put your wanted IP adress that has to be the same put inside the python code
(if it is not working ther is another website: https://raspberrypi-guide.github.io/networking/create-wireless-access-point)

#Run the code
Once you have done that all you have to do is to run the python code at th booting part of the Raspberry pi
You can use this website: https://www.dexterindustries.com/howto/run-a-program-on-your-raspberry-pi-at-startup/
I highly recommend to use the 4th method (Systemd) so that you can change 'After=multi-user.target' by 'After=network.target' and
also change 'WantedBy=multi-user.target' by 'WantedBy=network.target" in you "service" file in order to start the python code after the 
wifi initialisation. Otherwise, it won't work.
I also used these two websites to help me out: https://tecadmin.net/setup-autorun-python-script-using-systemd/  
et  https://unix.stackexchange.com/questions/57852/how-do-i-start-a-cron-job-1-min-after-reboot


Well done your Raspberry is working!




