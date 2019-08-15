#!/bin/bash

# This simple script is made to run any Angular/Ionic project without the hassle of havuing to write down all of the commands
# It adds support for older gradle versions considering it was made with an app that had an old gradle version.
# To run, write ./build-app.sh readd <platform> to remove/add platform of preference
#            or ./build-app.sh <platform> to build app for platform of preference 
#            where <platform> can be either ios or android

# shellscript color variables
red=`tput setaf 1`
green=`tput setaf 2`
white=`tput setaf 7`

# user input
uinput=$1

# validate input
if [ "$uinput" != "readd" ] && [ "$uinput" != "android" ] && [ "$uinput" != "ios" ]
then
    echo ""
    echo "${red}Invalid parameters. ${white}How to correctly run this script: "
    echo "" 
    echo "${green} ./build-app.sh readd <platform> ${white} to remove & add platform"
    echo ""
    echo "${green} ./build-app.sh <platform> ${white} to build project"
    echo ""
    exit
fi

if [ $uinput = "readd" ] 
then
    platform=$2
    echo ""
    echo "${green}REMOVING "$platform" PLATFORM"
    echo ""
    ionic cordova platform remove $platform;
    echo ""
    echo "${green}ADDING "$platform" PLATFORM"
    echo ""
    ionic cordova platform add $platform;
    echo ""
    echo "${green}Done!"
    echo ""
    exit
fi

platform=$uinput

if [ $platform == 'android' ]
then
    echo ""
    echo "${green}ADDING CORDOVA PLUGIN cordova-android-support-gradle-release"
    echo ""
    ionic cordova plugin add cordova-android-support-gradle-release;
fi

echo "" 
echo "${green}PREPARING PLATFORM FOR BUILD PROCESS"
echo "" 
ionic cordova prepare $platform;
echo ""
echo "${green}BUILDING "$platform" PROJECT"
echo ""
ionic cordova build $platform;
echo ""
echo "Build done! If build was successful, run ${green}ionic serve ${white}to view your app in-browser or ${green}ionic cordova run android/ios ${white}to view in-device."
