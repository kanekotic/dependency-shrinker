# ![logomakr_6rglby](https://cloud.githubusercontent.com/assets/3071208/22743728/b6164884-ede0-11e6-9bbe-5e7643b22be7.png)

[![Build Status](https://travis-ci.org/kanekotic/dependency-shrinker.svg?branch=master)](https://travis-ci.org/kanekotic/dependency-shrinker)
[![codecov](https://codecov.io/gh/kanekotic/dependency-shrinker/branch/master/graph/badge.svg)](https://codecov.io/gh/kanekotic/dependency-shrinker)
[![npm](https://img.shields.io/npm/dt/dependency-shrinker.svg)](https://github.com/kanekotic/dependency-shrinker)
[![GitHub license](https://img.shields.io/github/license/kanekotic/dependency-shrinker.svg)](https://github.com/kanekotic/dependency-shrinker/blob/master/LICENSE)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/kanekotic/dependency-shrinker/graphs/commit-activity)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/kanekotic/)

## Mission

a command line tool to check what dependencies of an executable are really critical and not

## Installation

```
npm install dependency-shrinker -g
```

## use

this command will list the runtime dependencies that can be possible removed (will only detect the ones that will cause a crash if removed).
```
depshrink <Path to executable> <boot time> [Paths to dependencies folders]
```
## Warning

if you kill the process of the command line tool at any point of execution you might end up in a situation where a dependency is missing. 

I will not take resposability on the issues generated by this package, so use at your own risk and make sure you backup all before using. And use with caution.

### Logo

Arrows graphic by <a href="http://www.flaticon.com/authors/stephen-hutchings">Stephen Hutchings</a> from <a href="http://www.flaticon.com/">Flaticon</a> is licensed under <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC BY 3.0</a>. Made with <a href="http://logomakr.com" title="Logo Maker">Logo Maker</a>