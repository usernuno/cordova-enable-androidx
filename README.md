# cordova-enable-androidx

If Android preference `EnableAndroidX` is `true`, then the following properties are added to `gradle.properties`:

```
android.useAndroidX=true
android.enableJetifier=true
```

Also adds a gradle script to the project. When the Android preference `EnableAndroidX` is `true`, this script replaces the necessary imports and other stuff in order to make the project code that uses old support libraries work with AndroidX packages.

Experimental code, use at your own risk.
