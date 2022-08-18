# js-releases

[![Run tests](https://github.com/hashicorp/js-releases/actions/workflows/test.yml/badge.svg)](https://github.com/hashicorp/js-releases/actions/workflows/test.yml)
[![Publish](https://github.com/hashicorp/js-releases/actions/workflows/publish.yml/badge.svg)](https://github.com/hashicorp/js-releases/actions/workflows/publish.yml)

## Download packages from releases.hashicorp.com

`js-releases` is a handy tool for downloading and verifying packages from [releases.hashicorp.com](https://releases.hashicorp.com/).

You can:

- fetch metadata for a given release (or latest)
- download the package
- verify the SHASUM and signature
- unpack to a specified directory

## Environment variables

The downloader can be configured with environment variables.

Currently available variables:

| Environment variable           | Description                                                    | Default |
|:-------------------------------|:---------------------------------------------------------------|:--------|
| `HTTP_PROXY` \| `http_proxy`   | If configured will set the HTTP proxy to fetch/download with.  | -       |
| `HTTPS_PROXY` \| `https_proxy` | If configured will set the HTTPS proxy to fetch/download with. | -       |

## Usage

```js
import { Release, getRelease } from '@hashicorp/js-releases';

// Setting a user agent string is optional but helpful!
const userAgent = `Example-Program/1.0.0 js-releases/dev`;

// Download metadata for a release using a semver range or "latest"
// "latest" is set by default if no range is included
const release = await getRelease("terraform-ls", "latest", userAgent);

// Include pre-releases in the semver range
const preRelease = await getRelease("terraform-ls", "^1.0.pre-0", userAgent, true);

// Select metadata for a build matching a given OS and arch
const build = release.getBuild(os, arch);

// Download the release to an install path
const installPath = "/hc_product/downloads"
await release.download(build.url, installPath, userAgent);

// Verify the release shasum and signature
await release.verify(installPath, build.filename);

// Unpack the release from the install path to a destination
const destination = "/usr/local/bin"
return release.unpack(installPath, destination)
```

## Validating releases

Packages are verified using HashiCorp's public GPG key `72D7468F`. The previous key was rotated and revoked per [HCSEC-2021-12](https://discuss.hashicorp.com/t/hcsec-2021-12-codecov-security-event-and-hashicorp-gpg-key-exposure/23512) on 2021-04-22. As a result, earlier versions of `js-releases` will no longer be able to verify packages.

## License

[Mozilla Public License v2.0](https://github.com/hashicorp/setup-terraform/blob/master/LICENSE)

## Code of Conduct

[Code of Conduct](https://github.com/hashicorp/setup-terraform/blob/master/CODE_OF_CONDUCT.md)

## Experimental Status

By using the software in this repository (the "Software"), you acknowledge that: (1) the Software is still in development, may change, and has not been released as a commercial product by HashiCorp and is not currently supported in any way by HashiCorp; (2) the Software is provided on an "as-is" basis, and may include bugs, errors, or other issues;  (3) the Software is NOT INTENDED FOR PRODUCTION USE, use of the Software may result in unexpected results, loss of data, or other unexpected results, and HashiCorp disclaims any and all liability resulting from use of the Software; and (4) HashiCorp reserves all rights to make all decisions about the features, functionality and commercial release (or non-release) of the Software, at any time and without any obligation or liability whatsoever.
