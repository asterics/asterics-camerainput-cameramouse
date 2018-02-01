# AsTeRICS Camera Mouse
This folder contains a solution for a camera mouse enabling mouse control (moving mouse cursor, clicking and dragging) by head movements. 

By moving the head up/down or left/right the mouse cursor should move accordingly. A left click is performed by dwelling (stopping movement and waiting for some time). To do a right, double or drag click select the respective button in the ARE GUI and move the cursor to the location where the click should be performed at. The mouse speed can be changed by using the slider. Click on the On/Off button to toggle mouse control.

The repository is an AsTeRICS based solution using the [APE (AsTeRICS Packaging Environment)](https://github.com/asterics/AsTeRICS/wiki/AsTeRICS-Packaging-Environment-(APE)) template folder structure.

# Prerequisites

You need at least
1. [Java Runtime Environment 8](http://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html). **Some plugins only work with a 32-bit JRE.** You can have mixed installations of JREs/JDKs (32bit, 64bit). APE automatically prefers the 32-bit JDK/JRE on windows for the run targets. If you want to override this, set the property ```fx.platform.basedir``` in the file [APE.properties](APE.properties) to the path of your JDK/JRE.
If you want to create deployment files (.exe, .deb,...), you must have installed additional dependencies like a JDK.
2. [apache ant build framework (version >= 1.9.1)](http://ant.apache.org/bindownload.cgi) **or** an IDE for Java Developers, e.g. [Eclipse](http://www.eclipse.org/downloads/packages/eclipse-ide-java-developers/neon3) (already contains ant)
3. [AsTeRICS 3.0](https://github.com/asterics/AsTeRICS/releases/tag/v3.0) installed **or** a snapshot of [AsTeRICS](https://github.com/asterics/AsTeRICS) cloned to a parallel folder of the project.
4. Integrated Webcam or USB camera.

# Demos / Examples

You can try the online [demo](http://asterics.github.io/AsTeRICS/demos.html#xfacetrackerlk) and also some other [asterics solution example repositories](https://github.com/asterics?utf8=%E2%9C%93&q=topic%3Aexample&type=&language=) here.

# Run project

Enter

```ant run```

to build all the dependencies and start the ARE.

You can also start the ARE using the ARE start-scripts in the ```build/merged/bin/ARE``` folder.

# Build project

Open a console or use your favorite IDE and run

```ant build-all```

to build all the dependencies and merge all files together in the ```build/merged/bin/ARE``` folder

# Release project

To create a native installer open a console and run

```ant deploy```

Please also check additional [dependencies](https://github.com/asterics/AsTeRICS/tree/master/bin/APE#dependencies) and [usage examples](https://github.com/asterics/AsTeRICS/tree/master/bin/APE#example-usages-of-the-build-infrastructure). 

# Related Videos
* [Camera Mouse Demo Screencast](https://youtu.be/P9qJAWegkFM?t=1955)
* [Camera Mouse Model Creation Screencast](https://youtu.be/P9qJAWegkFM?t=2228)
* [Camera Mouse Rollout at GuadalInfo Telecenters (10.000 Workstations)](https://www.youtube.com/watch?v=of0643WQ85Q)

# Related Tutorials
* [Camera Mouse Creation StepbyStep Tutorial](https://github.com/asterics/AsTeRICS/blob/master/Documentation/AsTeRICS_CameraMouseCreation_StepbyStep_Tutorial.pdf)

# Folder structure
Subsequently you can see the simplified folder structure of an APE-based project, which contains an ant build file (**```build.xml```**), a property-based configuration file (**```APE.properties```**), the **```custom/bin/ARE```** folder to store the solution-specific files (e.g. model files), a **```build```** folder and a **```package```** folder for native installer customization. 

```
build
  |- merged
  |- deploy
custom
  |- bin/ARE
    |- data
    |- images
    |- LICENSE
    |- models
      |- <custom model file>.acs
      |- ...
    |-profile
package
  |- linux
  |- windows
  |- macosx
APE.properties
build.xml
```

# How to use the repository

Put all your custom files (model files, images, config files,...) to the [custom/bin/ARE](custom/bin/ARE) folder. 

In case you have a web UI put the files (.html, images, .css, .js,...) to the document root [(custom/bin/ARE/web)](custom/bin/ARE/web) of the built-in webserver. The webserver also provides a [websocket](https://github.com/asterics/AsTeRICS/wiki/AsTeRICS-Websocket). Finally the ARE provides a [REST API](https://github.com/asterics/AsTeRICS/wiki/AsTeRICS-REST-API) that can be used within a web application.

Before the project can be run it must be [built](#build-project) (automatically builds the AsTeRICS repository and copies/merges needed plugin jars and project files to the ```build/merged/bin/ARE`` folder). You can also directly [run](#run-project) the ARE with the project's solution.

# Recommended workflow

1. Save custom files (models, images, config files,...) to the custom/bin/ARE folder or modify them
2. Call ```ant run-quick``` (Only copies the files of the custom folder to the merged/bin/ARE folder but does **no cleanup** and **no building of dependencies**)
3. In case you have a Web UI, open [http://localhost:8081](http://localhost:8081)
4. If you want to modify the running model, press 'F8' to open it in the WebACS, then modify and upload it. To save successful modifications permanently, save the model file to the ```custom/bin/ARE/models``` folder again.
5. Kill program and go to step 1

# Other ant targets

To see all supported targets, call

```ant -projecthelp```

# Changing AsTeRICS snapshot (ARE) used

The property ```ARE.baseURI``` defines the location of the ARE used for the execution of the project. 

APE automatically searches for an ARE at the following locations:
1. ```dependencies/AsTeRICS/bin/ARE``` (if Asterics is added as submodule)
2. ```../AsTeRICS/bin/ARE``` (if it's an APE projectdir withouth FABI and FLipMouse folder structure)
3. ```../../AsTeRICS/bin/ARE``` (if it's an AT solution folder structure)
4. ```C:/Program Files (x86)/AsTeRICS/ARE/``` (if there is an Asterics installation on windows)

You can also set ARE.baseURI manually, either in the file ```APE.properties``` or within an ant call, e.g. ```ant -DARE.baseURI=<path to ARE> run```
 
# License

Dual license MIT or GPLv3 with CLASSPATH exception. Please read more in the [license section](https://github.com/asterics/AsTeRICS/wiki/Licensing) of the wiki.
