# Profile-Badge-Generator

<img src="static/screenshot.png" alt="screenshot" height="300px"/>

The purpose of this project is to provide an easy way to create Badges like this one:

![Svelte Badge](https://img.shields.io/badge/Svelte-FF3E00?style=for-the-badge&logo=Svelte&logoColor=FFFFFF)

## Usage:

1. Go to https://profilebadges.vercel.app/
2. Enter the Logo you're trying to find
3. Press copy or download the Badge image.

## API:

URL: **https://profilebadges.vercel.app/api/%7Btitle%7D-%7BpreserveIcon%7D.json**

Preserve Icon [true/false]: If this option is enabled, the badge will have a white/black background and the icon is in the brands color. Otherwise, the background will have the brands color and the icon will be white/black.

**true:** ![Svelte](https://img.shields.io/badge/Svelte-FFFFFF?style=for-the-badge&logo=Svelte&logoColor=FF3E00)

**false:** ![Svelte](https://img.shields.io/badge/Svelte-FF3E00?style=for-the-badge&logo=Svelte&logoColor=FFFFFF)
