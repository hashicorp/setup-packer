# 1.6.1 (2022-07-22)

BUG FIXES:

* Fix error on picking latest vault releases by @markmartirosian in https://github.com/hashicorp/js-releases/pull/56

INTERNAL:

* Migrate test from mocha to jest by @dbanck in https://github.com/hashicorp/js-releases/pull/58
* Bump prettier from 2.6.2 to 2.7.1 by @dependabot in https://github.com/hashicorp/js-releases/pull/54
* Bump @types/semver from 7.3.9 to 7.3.10 by @dependabot in https://github.com/hashicorp/js-releases/pull/55
* Bump typescript from 4.6.3 to 4.7.4 by @dependabot in https://github.com/hashicorp/js-releases/pull/57
* Bump @types/jest from 28.1.4 to 28.1.5 by @dependabot in https://github.com/hashicorp/js-releases/pull/59
* Bump @types/node from 14.18.21 to 14.18.22 by @dependabot in https://github.com/hashicorp/js-releases/pull/62
* Bump jest from 28.1.2 to 28.1.3 by @dependabot in https://github.com/hashicorp/js-releases/pull/60
* Bump ts-jest from 28.0.5 to 28.0.6 by @dependabot in https://github.com/hashicorp/js-releases/pull/61
* Bump ts-jest from 28.0.6 to 28.0.7 by @dependabot in https://github.com/hashicorp/js-releases/pull/63
* Bump @types/jest from 28.1.5 to 28.1.6 by @dependabot in https://github.com/hashicorp/js-releases/pull/64

# 1.6.0 (2022-06-14)

BUG FIXES:

* Swap `proxy-agent` with `https-proxy-agent` to fix `ftp` package warning by @magnetikonline in https://github.com/hashicorp/js-releases/pull/43

ENHANCEMENT:

* Workflow and `README.md` tweaks by @magnetikonline in https://github.com/hashicorp/js-releases/pull/44

INTERNAL:

* Bump @types/yauzl from 2.9.2 to 2.10.0 by @dependabot in https://github.com/hashicorp/js-releases/pull/34
* Bump typescript from 4.6.2 to 4.6.3 by @dependabot in https://github.com/hashicorp/js-releases/pull/31
* Bump prettier from 2.6.0 to 2.6.2 by @dependabot in https://github.com/hashicorp/js-releases/pull/32
* Bump semver from 7.3.5 to 7.3.6 by @dependabot in https://github.com/hashicorp/js-releases/pull/33
* Bump semver from 7.3.6 to 7.3.7 by @dependabot in https://github.com/hashicorp/js-releases/pull/35
* Bump @types/node from 14.18.12 to 14.18.13 by @dependabot in https://github.com/hashicorp/js-releases/pull/36
* Bump @types/mocha from 9.1.0 to 9.1.1 by @dependabot in https://github.com/hashicorp/js-releases/pull/37
* Bump @types/node from 14.18.13 to 14.18.14 by @dependabot in https://github.com/hashicorp/js-releases/pull/38
* Bump @types/node from 14.18.14 to 14.18.15 by @dependabot in https://github.com/hashicorp/js-releases/pull/39
* Bump @types/node from 14.18.15 to 14.18.16 by @dependabot in https://github.com/hashicorp/js-releases/pull/40
* Bump @types/node from 14.18.16 to 14.18.18 by @dependabot in https://github.com/hashicorp/js-releases/pull/47
* Bump @types/node from 14.18.18 to 14.18.21 by @dependabot in https://github.com/hashicorp/js-releases/pull/51

# 1.5.1 (2022-03-17)

BUG FIXES:

 - Fix `download` and `verify` ([#27](https://github.com/hashicorp/js-releases/pull/27))

INTERNAL:

 - Add prettier and format code ([#28](https://github.com/hashicorp/js-releases/pull/28))

# 1.5.0 (2022-02-07)

ENHANCEMENT:

- Implement Proxy usage ([#11](https://github.com/hashicorp/js-releases/pull/11))

DEPENDENCIES:

- Bump openpgpjs to v5.1.0 ([#15](https://github.com/hashicorp/js-releases/pull/15))
- Upgrade openpgpjs to v5.0.1 stable and modify usage ([#12](https://github.com/hashicorp/js-releases/pull/12))

# 1.4.0 (2021-04-23)

Security:

- Update public GPG key for validating releases (#9)

Dependencies:

- Upgrade openpgpjs to v5.0 pre-release (#8)

# 1.3.0 (2021-02-08)

- Update dependencies and set explicit https url for GitHub dependency (#5)

# 1.2.1 (2020-12-09)

- Replace openpgp with fork to fix downstream bundle (#4)

# 1.2.0 (2020-12-01)

- Allow pre-release version ranges (#2)

# 1.1.0 (2020-11-17)

- Match version ranges (#1)

# 1.0.2 (2020-11-13)

Bugs:
- Fix handling of request for latest release
- Republish patch to fix build error

# 1.0.0

js-releases is a handy tool for downloading and verifying packages from releases.hashicorp.com. You can:
 - fetch metadata for a given release (or latest)
 - download the package
 - verify the SHASUM and signature
 - unpack to a specified directory
