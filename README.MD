# Tibsen

[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts) [![Made with TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)

Tibsen is a small utility script to automate presence marking for UNPAR students. Tibsen will also create a log `absen.log` in the current directory that stores tibsen execution history.

Currently, on testing phase (please don't install it atm!). 

> ⚠️ **WARNING**: This script **DOES NOT** encourage you to cheat presence data on your class!
Use this at your own risk!

## Motivation

I created this script since the new presence marking requires student to login on Student Portal. Student Portal is infamous for being slow when flooded with many network traffic. I don't want to wait about 10 minutes to refresh when I'm listening to the lecture.

As I have said before, I don't encourage you to cheat on your presence data. You must realize what's the best for yourself.

## Usage

1. Clone this repository
2. Navigate to your freshly cloned directory
3. Create a new file called `config.json` and fill it with your credentials and schedule (see [below](#configuration-format)).
4. Build the files by executing `npm run build`
5. (Windows Users) - Create a shortcut on your Startup folder to `batch/tibsen.bat`
6. Enjoy your hassle-free lectures!

## Configuration Format

```json
{
  "email": "student_account_email",
  "password": "student_account_password",
  "schedule": [
    [],
    [8],
    [14],
    [7, 9],
    [9]
  ]
}
```

## Schedule

`tibsen` will read your schedule before deciding if `tibsen`
should automatically mark your StuPor presence in the current cycle or not.

It's written in zero-based index array format, the first index is Monday,
the second index is Tuesday and so on until the fifth index which
is Friday.

Each day, you can specify on which hour should Tibsen mark
your StuPor presence. You *must* specify it in 24-hour format.

For example, if `tibsen` is configured using this configuration:

```json
[
  [7],
  [],
  [8, 13],
  [],
  []
]
```

`tibsen` will automatically attempt to mark your StuPor presence
every Monday at 7 A.M. and every Wednesday at 8 A.M. and 1 P.M. (note the 24-hour formatting).

## Acknowledgements

- Chris Qiang - [chez14](https://github.com/chez14), [DeSSO](https://github.com/chez14/desso) is the base foundation of this project.

## License

This project is licensed under the [MIT License](./LICENSE)
