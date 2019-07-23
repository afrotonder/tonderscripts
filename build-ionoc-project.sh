
#!/bin/bash

# By Omar Rosado Ramirez - github.com/afrotonder

# This is a simple shell script that builds any Ionic 3 & 4 project.
# Since it was made for a project that migrated from Ionic 3 to Ionic 4 and android SDK's change
#   a gradle plugin handler is installed in the steps below on choosing Android as your platform.
# Keep that in mind if using and comment/remove the lines as needed.

# HOW TO RUN
# ./build-ionic-project.sh readd <platform> : Removes and adds selected platform. Will prompt for platform if nor provided.
# ./buold-ionic-project.sh <platform> : Build project for selected platform. 

# shellscript color variables
red=`tput setaf 1`
green=`tput setaf 2`
white=`tput setaf 7`

# user input
uinput=$1

# validate input
if [ $uinput != "readd" ] && [ $uinput != "android" ] && [ $uinput != 'ios' ]
then
    echo ""
    echo "${red}Invalid parameters. ${white}How to correctly run this script: "
    echo "" 
    echo "${green} ./build-tcc.sh readd <platform> ${white} to remove & add platform"
    echo ""
    echo "${green} ./build-tcc.sh <platform> ${white} to build project"
    echo ""
    exit
fi

if [ $uinput = "readd" ] 
then
    platform=$2
    echo ""
    echo "REMOVING "$platform" PLATFORM"
    echo ""
    ionic cordova platform remove $platform;
    echo ""
    echo "ADDING "$platform" PLATFORM"
    echo ""
    ionic cordova platform add $platform;
    echo ""
    echo "Done!"
    echo ""
    exit
fi

platform=$uinput

if [ $platform == 'android' ]
then
    echo ""
    echo "ADDING CORDOVA PLUGIN cordova-android-support-gradle-release"
    echo ""
    ionic cordova plugin add cordova-android-support-gradle-release;
fi

echo "" 
echo "PREPARING PLATFORM FOR BUILD PROCESS"
ionic cordova prepare $platform;
echo "BUILDING "$platform" PROJECT"
echo ""
ionic cordova build $platform;
echo ""
echo "Build done! If build was successful, run ${green}ionic serve ${white}to view your app in-browser or ${green}ionic cordova run android/ios ${white}to view in-device."
