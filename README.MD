# Tibsen

[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts) [![Made with TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)

Tibsen is a small utility script to automate presence marking for UNPAR students.

Currently, on testing phase (please don't install it atm!).
~~Also it doesn't work for 7 A.M. classes yet.~~

> ⚠️ **WARNING**: This script **DOES NOT** encourage you to cheat presence data on your class!
Use this at your own risk!

## Motivation

I created this script since the new presence marking requires student to login on Student Portal. Student Portal is infamous for being slow when flooded with many network traffic. I don't want to wait about 10 minutes to refresh when I'm listening to the lecture.

As I have said before, I don't encourage you to cheat on your presence data. You must realize what's the best for yourself.

## Usage

Send a POST request to [this link](tibsen.vercel.app) with these payloads

Name | Description
---- | -----------
email | UNPAR's student account email address
password | UNPAR's student account password
schedule | Your lecture schedule, see details [below](#About-Schedule)

> It's recommended that you use a CRON job to send the request to make the presence management as painless as possible, however any HTTP request will do.

## About Schedule

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

## Data Privacy

Technically, I won't even dare to take a peek at your account data. However, debugging process usually exposes your HTTP payload which includes your sensitive data.

If this happens, I'll try to notify you as soon as possible. Please change your sensitive information as soon as possible.

If you don't trust me, don't use this.

## Acknowledgements

- Chris Qiang - [chez14](https://github.com/chez14), [DeSSO](https://github.com/chez14/desso) is the base foundation of this project.

## License

This project is licensed under the [MIT License](./LICENSE)
