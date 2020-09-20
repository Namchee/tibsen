# Tibsen

[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)

More details coming soon~

## Configuration

The configuration file is stored at `config.json` from the root directory.
`tibsen` will attempt to read this file before deciding if `tibsen`
should automatically mark your StuPor presence in the current cycle or not.

It's written in zero-based index array format, the first index is Monday,
the second index is Tuesday and so on until the fifth index which
is Friday.

Each day, you can specify on which hour should Tibsen mark
your StuPor presence. You *must* specify the hour in 24-hour format.

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
