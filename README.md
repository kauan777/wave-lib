![Audio Waveform - Simform](./assets/react_native_audiowave.gif)

# react-native-audio-waveform

[![react-native-audio-waveform on npm](https://img.shields.io/npm/v/@simform_solutions/react-native-audio-waveform.svg?&logo=npm&logoColor=white&color=red&labelColor=grey&cacheSeconds=3600&maxAge=86400)](https://www.npmjs.com/package/@simform_solutions/react-native-audio-waveform) [![react-native-audio-waveform downloads](https://img.shields.io/npm/dm/@simform_solutions/react-native-audio-waveform?&logo=npm&logoColor=white&color=blue&labelColor=grey&cacheSeconds=3600&maxAge=86400)](https://www.npmtrends.com/@simform_solutions/react-native-audio-waveform) [![react-native-audio-waveform install size](https://packagephobia.com/badge?p=@simform_solutions/react-native-audio-waveform&icon=disk&logoColor=white&color=yellow&labelColor=grey&cacheSeconds=3600&maxAge=86400)](https://packagephobia.com/result?p=@simform_solutions/react-native-audio-waveform) [![Android](https://img.shields.io/badge/Platform-Android-green?logo=android&logoColor=white&labelColor=grey)](https://www.android.com) [![iOS](https://img.shields.io/badge/Platform-iOS-green?logo=apple&logoColor=white&labelColor=grey)](https://developer.apple.com/ios) [![MIT](https://img.shields.io/badge/License-MIT-green&labelColor=grey)](https://opensource.org/licenses/MIT)

---

A React Native package featuring native modules for generating and rendering audio waveforms. Designed to efficiently produce visual representations for pre-recorded audio files and dynamically draw waveforms in real-time during audio recording within React Native applications.

---

## 🎬 Preview

| Audio Playback Waveform                                                                                                                                                                 | Audio Record Waveform                                                                                                                                                               | Audio Waveform with Speed                                                                                                                                                                        |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <a href="https://github.com/SimformSolutionsPvtLtd/react-native-audio-waveform"><img width="400px;" height="500px;" alt="AudioPlaybackWaveform" src="./assets/audio_playback.gif"> </a> | <a href="https://github.com/SimformSolutionsPvtLtd/react-native-audio-waveform"><img width="400px;" height="500px;" alt="AudioRecordWaveform" src="./assets/audio_record.gif"> </a> | <a href="https://github.com/SimformSolutionsPvtLtd/react-native-audio-waveform"><img width="400px;" height="500px;" alt="AudioRecordWaveform" src="./assets/audio_playback_with_speed.gif"> </a> |

## Quick Access

- [Installation](#installation)
- [Usage and Examples](#usage)
- [Properties](#properties)
- [Example Code](#example)
- [License](#license)

## Getting Started 🔧

Here's how to get started with react-native-audio-waveform in your React Native project:

### Installation

##### 1. Install the package

```sh
npm install @simform_solutions/react-native-audio-waveform react-native-blob-util react-native-gesture-handler
```

###### --- or ---

```sh
yarn add @simform_solutions/react-native-audio-waveform react-native-blob-util react-native-gesture-handler
```

##### 2. Install CocoaPods in the iOS project

```bash
npx pod-install
```

##### Know more about [react-native-blob-util](https://www.npmjs.com/package/react-native-blob-util) and [react-native-gesture-handler](https://www.npmjs.com/package/react-native-gesture-handler)

##### 3. Add audio recording permissions

##### iOS

If you want to use recorder features in iOS, you have to add **NSMicrophoneUsageDescription** permission in info.plist and add a description based on your use case.

Here is a sample for info.plist permission and a description.

```
<key>NSMicrophoneUsageDescription</key>
<string>Needed permission to record audio</string>
```

##### Android

If you want to use recorder features in Android, you have to add **RECORD_AUDIO** permission in AndroidManifest.xml.

```xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
```

### Usage

#### 1. Static waveform

When you want to show a waveform for a pre-existing audio file, you need to use `static` mode for the waveform. We have provided type safety for forward ref so that if you pass the `static` mode then you can only access methods which are available for static mode other methods will reject promise.

Check the example below for more information.

```tsx
import {
  Waveform,
  type IWaveformRef,
} from '@simform_solutions/react-native-audio-waveform';

const path = ''; // path to the audio file for which you want to show waveform
const ref = useRef<IWaveformRef>(null);
<Waveform
  mode="static"
  ref={ref}
  path={path}
  candleSpace={2}
  candleWidth={4}
  scrubColor="white"
  onPlayerStateChange={playerState => console.log(playerState)}
  onPanStateChange={isMoving => console.log(isMoving)}
/>;
```

When you want to show a waveform for a external audio URL, you need to use `static` mode for the waveform and set isExternalUrl to true.

Check the example below for more information.

```tsx
import {
  Waveform,
  type IWaveformRef,
} from '@simform_solutions/react-native-audio-waveform';

const url = 'https://www2.cs.uic.edu/~i101/SoundFiles/taunt.wav'; // URL to the audio file for which you want to show waveform
const ref = useRef<IWaveformRef>(null);
<Waveform
  mode="static"
  ref={ref}
  path={url}
  isExternalUrl={true}
  autoDownloadExternalAudio={true}
  onDownloadingStateChange={state => console.log(state)}
  onDownloadProgressChange={progress => console.log(progress)}
  candleSpace={2}
  candleWidth={4}
  scrubColor="white"
  onPlayerStateChange={playerState => console.log(playerState)}
  onPanStateChange={isMoving => console.log(isMoving)}
/>;
```

#### 2. Live recording waveform

When you want to record audio and show a waveform for that recording, you need to create a waveform with `live` mode. Same as `static` mode, we have safety for ref methods.

Check the example below for more information.

```tsx
import {
  Waveform,
  type IWaveformRef,
} from '@simform_solutions/react-native-audio-waveform';

const ref = useRef<IWaveformRef>(null);
<Waveform
  mode="live"
  ref={ref}
  candleSpace={2}
  candleWidth={4}
  onRecorderStateChange={recorderState => console.log(recorderState)}
/>;
```

You can check out the full example at [Example](./example/src/App.tsx).

---

## Properties

| **Props**                 | **Default** | **Static Mode** | **Live Mode** | **Type**                                                   | **Description**                                                                                                                                                                                                                                 |
| ------------------------- | ----------- | --------------- | ------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| mode\*                    | -           | ✅              | ✅            | 'live' or 'static'                                         | Type of waveform. It can be either `static` for the resource file or `live` if you want to record audio                                                                                                                                         |
| ref\*                     | -           | ✅              | ✅            | IWaveformRef                                               | Type of ref provided to waveform component. If waveform mode is `static`, some methods from ref will throw error and same for `live`.<br> Check [IWaveformRef](#iwaveformref-methods) for more details about which methods these refs provides. |
| path\*                    | -           | ✅              | ❌            | string                                                     | Used for `static` type. It is the resource path of an audio source file.                                                                                                                                                                        |
| playbackSpeed             | 1.0         | ✅              | ❌            | 1.0 / 1.5 / 2.0                                            | The playback speed of the audio player. Note: Currently playback speed only supports, Normal (1x) Faster(1.5x) and Fastest(2.0x), any value passed to playback speed greater than 2.0 will be automatically adjusted to normal playback speed   |
| volume                    | 3           | ✅              | ❌            | number                                                     | Used for `static` type. It is a volume level for the media player, ranging from 1 to 10.                                                                                                                                                        |
| isExternalUrl             | false       | ✅              | ❌            | boolean                                                    | Used for `static` type. If the resource path of an audio file is a URL, then pass true; otherwise, pass false.                                                                                                                                  |
| autoDownloadExternalAudio | false       | ✅              | ❌            | boolean                                                    | Used for `static` type. Indicates whether the external media should be auto downloaded or not.                                                                                                                                                  |
| candleSpace               | 2           | ✅              | ✅            | number                                                     | Space between two candlesticks of waveform                                                                                                                                                                                                      |
| candleWidth               | 5           | ✅              | ✅            | number                                                     | Width of single candlestick of waveform                                                                                                                                                                                                         |
| candleHeightScale         | 3           | ✅              | ✅            | number                                                     | Scaling height of candlestick of waveform                                                                                                                                                                                                       |
| maxCandlesToRender        | 300         | ❌              | ✅            | number                                                     | Number of candlestick in waveform                                                                                                                                                                                                               |
| containerStyle            | -           | ✅              | ✅            | `StyleProp<ViewStyle>`                                     | style of the container                                                                                                                                                                                                                          |
| waveColor                 | #545454     | ✅              | ✅            | string                                                     | color of candlestick of waveform                                                                                                                                                                                                                |
| scrubColor                | #7b7b7b     | ✅              | ❌            | string                                                     | color of candlestick of waveform which has played                                                                                                                                                                                               |
| onPlayerStateChange       | -           | ✅              | ❌            | ( playerState : PlayerState ) => void                      | callback function, which returns player state whenever player state changes.                                                                                                                                                                    |
| onPanStateChange          | -           | ✅              | ❌            | ( panMoving : boolean ) => void                            | callback function which returns boolean indicating whether audio seeking is active or not.                                                                                                                                                      |
| onRecorderStateChange     | -           | ❌              | ✅            | ( recorderState : RecorderState ) => void                  | callback function which returns the recorder state whenever the recorder state changes. Check RecorderState for more details                                                                                                                    |
| onCurrentProgressChange   | -           | ✅              | ❌            | ( currentProgress : number, songDuration: number ) => void | callback function, which returns current progress of audio and total song duration.                                                                                                                                                             |
| onChangeWaveformLoadState | -           | ✅              | ❌            | ( state : boolean ) => void                                | callback function which returns the loading state of waveform candlestick.                                                                                                                                                                      |
| onDownloadingStateChange  | -           | ✅              | ❌            | ( state : boolean ) => void                                | A callback function that returns the loading state of a file download from an external URL.                                                                                                                                                     |
| onDownloadProgressChange  | -           | ✅              | ❌            | ( currentProgress : number ) => void                       | Used when isExternalUrl is true; a callback function that returns the current progress of a file download from an external URL                                                                                                                  |
| onError                   | -           | ✅              | ❌            | ( error : Error ) => void                                  | callback function which returns the error for static audio waveform                                                                                                                                                                             |

##### Know more about [ViewStyle](https://reactnative.dev/docs/view-style-props), [PlayerState](#playerstate), and [RecorderState](#recorderstate)

---

## Cache Management for External Audio Files

The library provides caching capabilities when dealing with audio files from external URLs (when `isExternalUrl` is set to `true`). This helps in reducing network usage and improving loading times for frequently accessed audio files.

### How Caching Works

- **Cache Directory**: Audio files are cached in a platform-specific directory.
  - iOS: `RNFetchBlob.fs.dirs.DocumentDir`
  - Android: `RNFetchBlob.fs.dirs.CacheDir`
- **Automatic Downloads**: If `autoDownloadExternalAudio` is set to `true` (defaults to `false`), the library will automatically attempt to download and cache the audio file specified in the `path` prop when the component mounts.
- **Manual Downloads**: You can trigger the download and caching of an external audio file manually using the `downloadExternalAudio()` method available on the `Waveform` component's ref. This is useful if you want to control when the download occurs.
  ```tsx
  const waveformRef = useRef<IWaveformRef>(null);
  // ...
  const handleDownload = async () => {
    if (waveformRef.current && waveformRef.current.downloadExternalAudio) {
      const success = await waveformRef.current.downloadExternalAudio();
      if (success) {
        console.log('Audio downloaded and cached successfully!');
      } else {
        console.log('Audio download failed.');
      }
    }
  };
  ```
- **File Naming**: External URLs are converted into valid filenames for storage by replacing special characters.

### Cache Utility Functions

The library also exports several utility functions from `src/utils/cacheManager.ts` that you can use to manage the audio cache. You can import these functions into your project:

```ts
import {
  cleanExpiredAudioCache,
  getTotalAudioCacheSize,
  cleanAllAudioCache,
  addCacheEventListener,
} from '@simform_solutions/react-native-audio-waveform/src/utils/cacheManager'; // Adjust path if necessary based on your project structure
```

#### `cleanExpiredAudioCache(expirationTime: number): Promise<void>`

Deletes audio files from the cache that were last modified longer ago than the `expirationTime` (in milliseconds).

**Example:** Clean up expired audio files (e.g., older than 24 hours) and then log the current cache size, typically on app startup.

````tsx
import { useEffect } from 'react';
import {
  cleanExpiredAudioCache,
  getTotalAudioCacheSize,
} from '@simform_solutions/react-native-audio-waveform/src/utils/cacheManager'; // Adjust path if necessary

// Define the expiration time, e.g., 24 hours in milliseconds
const TWENTY_FOUR_HOURS_IN_MS = 24 * 60 * 60 * 1000;

const AudioCacheManager = () => {
  useEffect(() => {
    const manageCache = async () => {
      try {
        const hours = TWENTY_FOUR_HOURS_IN_MS / (60 * 60 * 1000);
        console.log(`Attempting to clean audio files older than ${hours} hours.`);
        await cleanExpiredAudioCache(TWENTY_FOUR_HOURS_IN_MS);
        console.log('Expired audio cache cleanup complete.');

        const totalSize = await getTotalAudioCacheSize();
        console.log(`Current total audio cache size: ${totalSize} bytes.`);
      } catch (error) {
        console.error('Error managing audio cache:', error);
      }
    };

    manageCache();
  }, []);

  // This component would typically be rendered once in your app, for example, in your main App component.
  // It doesn't render any UI itself.
  return null;
};

// To use it, you might include <AudioCacheManager /> in your main App component.

#### `getTotalAudioCacheSize(): Promise<number>`

Returns the total size (in bytes) of all audio files currently in the cache.

**Example:**

```tsx
const checkCacheSize = async () => {
  try {
    const size = await getTotalAudioCacheSize();
    console.log(`Total audio cache size: ${size} bytes`);
  } catch (error) {
    console.error('Failed to get total cache size:', error);
  }
};
````

#### `cleanAllAudioCache(): Promise<void>`

Deletes all audio files from the cache, regardless of their age.

**Example:** Provide a "Clear Cache" option in your app settings.

```tsx
const handleClearCache = async () => {
  try {
    await cleanAllAudioCache();
    console.log('All audio cache cleared.');
  } catch (error) {
    console.error('Failed to clear all audio cache:', error);
  }
};
```

#### `addCacheEventListener(listener: (removedFilePath: string) => void): () => void`

Adds an event listener that is called whenever an audio file is removed from the cache by one of the cleanup functions (`cleanExpiredAudioCache` or `cleanAllAudioCache`).
The listener function receives the path of the removed file.
This function returns an `unsubscribe` function to remove the listener.

**Example:**

```tsx
useEffect(() => {
  const handleCacheRemoval = (filePath: string) => {
    console.log(`File removed from cache: ${filePath}`);
  };

  const unsubscribe = addCacheEventListener(handleCacheRemoval);

  return () => {
    unsubscribe(); // Clean up the listener when the component unmounts
  };
}, []);
```

---

#### IWaveformRef Methods

#### For Static mode

#### startPlayer()

```ts
startPlayer({
    finishMode?: FinishMode;
}): Promise<boolean>
```

starts playing the audio with the specified finish mode. If finish mode is not specified, it will default to `FinishMode.stop`.

It returns a boolean indicating whether playback is started.

#### stopPlayer()

```ts
stopPlayer(): Promise<boolean>
```

It returns a boolean indicating whether playback is stopped.

#### pausePlayer()

```ts
pausePlayer(): Promise<boolean>
```

It returns a boolean indicating whether playback is paused.

#### resumePlayer()

```ts
resumePlayer(): Promise<boolean>
```

It returns a boolean indicating whether playback is resumed again.

#### downloadExternalAudio()

```ts
downloadExternalAudio(): Promise<boolean>
```

It returns a boolean indicating whether download and cache operation was successful

#### getDuration()

```ts
getDuration(): Promise<number>
```

Returns a promise that resolves with the duration of the audio file in milliseconds. This is only available in `static` mode.

#### For Live mode

#### startRecord()

```ts
startRecord({
    encoder:number;
    sampleRate: number;
    bitRate: number;
    fileNameFormat: string;
    useLegacy: boolean;
    updateFrequency?: UpdateFrequency;
}): Promise<boolean>
```

Start a new audio recording with the given parameters. It will return whether the recording was started or not.

Check [UpdateFrequency](#updatefrequency) to know more.

> Note: Before starting the recording, the user must allow **NSMicrophoneUsageDescription** for iOS. You can check the permissions by using **_checkHasAudioRecorderPermission_** from **_useAudioPermission_**. Check [useAudioPermission](#useaudiopermission-hook) to know more about various methods.

#### stopRecord()

```ts
stopRecord(): Promise<string>
```

It returns a string representing the current recorded audio file path.

#### pauseRecord()

```ts
pauseRecord(): Promise<boolean>
```

It returns a boolean indicating whether the recording is paused.

#### resumeRecord()

```ts
resumeRecord(): Promise<boolean>
```

It returns a boolean indicating whether the recording is resumed again.

### useAudioPermission hook

By using this hook, you can check and ask for permission from the user for **NSMicrophoneUsageDescription** permission.

#### checkHasAudioRecorderPermission()

This method checks whether the user has permission to use a microphone for recording new audio. It will return [PermissionStatus](#permissionstatus).

You can use this method as shown below:

```ts
const hasPermission: PermissionStatus = await checkHasAudioRecorderPermission();
```

#### getAudioRecorderPermission()

This method lets you ask for **NSMicrophoneUsageDescription** permission from the user. It will return PermissionStatus.

By combining this with checkHasAudioRecorderPermission you can ask for permission and start recording if permission is granted.

Check out the following example:

```ts
let hasPermission = await checkHasAudioRecorderPermission();

if (hasPermission === PermissionStatus.granted) {
  startRecording();
} else if (hasPermission === PermissionStatus.undetermined) {
  const permissionStatus = await getAudioRecorderPermission();
  if (permissionStatus === PermissionStatus.granted) {
    startRecording();
  }
} else {
  Linking.openSettings();
}
```

---

#### PlayerState

```ts
enum PlayerState {
  playing = 'playing',
  paused = 'paused',
  stopped = 'stopped',
}
```

#### RecorderState

```ts
enum RecorderState {
  recording = 'recording',
  paused = 'paused',
  stopped = 'stopped',
}
```

#### UpdateFrequency

```ts
// Update frequency in milliseconds
enum UpdateFrequency {
  high = 250.0,
  medium = 500.0,
  low = 1000.0,
}
```

#### PermissionStatus

```ts
enum PermissionStatus {
  denied = 'denied',
  undetermined = 'undetermined',
  granted = 'granted',
}
```

---

## Example

You can check out the example app for react-native-audio-waveform in [Example](./example/src/App.tsx)

To use example app you need to first run below command

```bash
cd example && npx react-native-asset
```

> Note: If link-assets-manifest.json file already exists then make sure to delete that before running npx react-native-asset command.

This command will add our example audio sample files to the iOS bundle so that we can access them inside the iOS app.

```sh
yarn
yarn example ios // For iOS
yarn example android // For Android
```

## Integrating into Another Project (Development Workflow)

If you are actively developing this library and want to test your local changes in another React Native project without publishing to npm, you can use the provided `build:export` script. This script builds the library, packs it, extracts it, and copies the relevant files to a target project directory.

**Steps:**

1.  **Configure the Target Path:**
    Open the `export.js` file in the root of this library. Modify the `TARGET_PATH` constant to point to the `node_modules/@simform_solutions/react-native-audio-waveform` directory within your _other_ project where you want to use the local build.

    ```javascript
    // export.js
    const TARGET_PATH =
      '/path/to/your/other/project/node_modules/@simform_solutions/react-native-audio-waveform';
    ```

2.  **Run the Export Script:**
    From the root of this library, run the following command:

    ```bash
    yarn build:export
    # or
    npm run build:export
    ```

    This will execute the script, and you should see the output files copied to your specified `TARGET_PATH`.

3.  **Handling Local Modifications with Patches (Optional but Recommended):**
    After exporting the library to your other project, you might make further modifications directly within that project's `node_modules/@simform_solutions/react-native-audio-waveform` directory for quick testing or specific adjustments.

    If you run `yarn build:export` again, these direct modifications in the target project will be overwritten.

    To persist these changes, it's highly recommended to use a tool like [`patch-package`](https://www.npmjs.com/package/patch-package). After making your desired changes in the target project's `node_modules` copy of this library:

    - Install `patch-package` in your _other_ project: `yarn add patch-package postinstall-postinstall` (or npm equivalent).
    - Add a postinstall script to your _other_ project's `package.json`:
      ```json
      "scripts": {
        "postinstall": "patch-package"
      }
      ```
    - Create a patch:
      `bash
      npx patch-package @simform_solutions/react-native-audio-waveform

    # or

    yarn patch-package @simform*solutions/react-native-audio-waveform
    `  This will generate a`.patch`file in a`patches` directory in your \_other* project. Now, whenever you (or your teammates) run `yarn install` (or `npm install`), these patches will be automatically applied after the package is installed. This ensures your local modifications are not lost when you re-export the library or when others install the project dependencies.

---

## Find this library useful? ❤️

Support it by joining [stargazers](https://github.com/SimformSolutionsPvtLtd/react-native-audio-waveform/stargazers) for this repository.⭐

## Bugs / Feature requests / Feedback

For bugs, feature requests, and discussion, please use [GitHub Issues](https://github.com/SimformSolutionsPvtLtd/react-native-audio-waveform/issues/new?labels=bug&late=BUG_REPORT.md&title=%5BBUG%5D%3A), [GitHub New Feature](https://github.com/SimformSolutionsPvtLtd/react-native-audio-waveform/issues/new?labels=enhancement&late=FEATURE_REQUEST.md&title=%5BFEATURE%5D%3A), [GitHub Feedback](https://github.com/SimformSolutionsPvtLtd/react-native-audio-waveform/issues/new?labels=enhancement&late=FEATURE_REQUEST.md&title=%5BFEEDBACK%5D%3A)

## 🤝 How to Contribute

We'd love to have you improve this library or fix a problem 💪
Check out our [Contributing Guide](CONTRIBUTING.md) for ideas on contributing.

## Awesome Mobile Libraries

- Check out our other [available awesome mobile libraries](https://github.com/SimformSolutionsPvtLtd/Awesome-Mobile-Libraries)

## License

- [MIT License](./LICENSE)
