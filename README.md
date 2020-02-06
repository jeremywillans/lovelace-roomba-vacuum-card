# roomba-vacuum-card

HA Lovelace Card for iRobot Roomba Vacuum Cleaner leveraging the rest980 Docker Image

Please refer my [ha-rest980-roomba](https://github.com/jeremywillans/ha-rest980-roomba) GitHub Repository for detailed instructions for using this card.

[![GH-release](https://img.shields.io/github/v/release/jeremywillans/lovelace-roomba-vacuum-card.svg?style=flat-square)](https://raw.githubusercontent.com/jeremywillans/lovelace-roomba-vacuum-card/master/roomba-vacuum-card.js)
[![GH-last-commit](https://img.shields.io/github/last-commit/jeremywillans/lovelace-roomba-vacuum-card.svg?style=flat-square)](https://github.com/jeremywillans/lovelace-roomba-vacuum-card/commits/master)
[![GH-code-size](https://img.shields.io/github/languages/code-size/jeremywillans/lovelace-roomba-vacuum-card.svg?style=flat-square)](https://github.com/jeremywillans/lovelace-roomba-vacuum-card)
[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg?style=flat-square)](https://github.com/custom-components/hacs)

## Setup

Install using [HACS](https://hacs.xyz/) using the following custom plugin repository ```https://github.com/jeremywillans/lovelace-roomba-vacuum-card```
```yaml
resources:
  - type: module
    url: /community_plugin/lovelace-roomba-vacuum-card/roomba-vacuum-card.js
```

OR 

Manually add [roomba-vacuum-card.js](https://raw.githubusercontent.com/jeremywillans/lovelace-roomba-vacuum-card/master/roomba-vacuum-card.js) and [vacuum.png](https://raw.githubusercontent.com/jeremywillans/lovelace-roomba-vacuum-card/master/vacuum.png)
to your `<config>/www/` folder and add the following to your `ui-lovelace.yaml` file:
```yaml
resources:
  - type: module
    url: /local/roomba-vacuum-card.js  
```
**Note:** You will need to update the image path when configuring lovelace as it by default will look in the hacs install folder

## Options

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `custom:roomba-vacuum-card`
| entity | string | **Required** | `sensor.vacuum`
| name | string/bool | `friendly_name` | Override entity friendly name (set to `false` to hide title)
| image | string/bool | `/<hacs>/vacuum.png` | Custom path/name of background image (set to `false` to disable background)
| buttons | object/bool | *(see below)* | Set to `false` to hide button row
| labels | object/bool | *(see below)* | Set to `false` to hide details/labels
| maint | bool | true | Display maintenance status
| clean_base | bool | true | If no Clean Base, Set to `false` to show Bin Status

### Buttons object

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| startstop | bool | `true` | Show or hide start button
| blank | bool | `true` | Show or hide blank button - splits startstop and dock
| dock | bool | `true` | Show or hide dock/empty button
| stop | bool | `false` | Show or hide stop button
| find | bool | `false` | Show or hide find button - not yet implemented in rest980

### Labels object

Customize or translate label names.

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| status | string | `Status` | Change status label
| mode | string | `Mode` | Change mode label
| battery | string | `Battery` | Change battery label
| clean_base | string | `Clean Base` | Change clean base label
| bin | string | `Bin` | Change bin label
| area_cleaned | string | `Area` | Change area cleaned  label
| job_time | string | `Time` | Change job time label
| total_jobs | string | `Jobs` | Change total jobs label
| evac_events | string | `Evacs` | Change clean base empties label (for Clean Base)

## Examples

Default

![roomba-vacuum-card](https://raw.githubusercontent.com/jeremywillans/lovelace-roomba-vacuum-card/master/examples/default.png)

Hidden Title/Name and Maintenance

![roomba-vacuum-card-no-title](https://raw.githubusercontent.com/jeremywillans/lovelace-roomba-vacuum-card/master/examples/no-title.png)

Hidden Button Row

![roomba-vacuum-card-no-buttons](https://raw.githubusercontent.com/jeremywillans/lovelace-roomba-vacuum-card/master/examples/no-buttons.png)

No Background Image and Hidden Title/Name

![roomba-vacuum-card-no-background](https://raw.githubusercontent.com/jeremywillans/lovelace-roomba-vacuum-card/master/examples/no-background.png)

Simple config example:
```yaml
- type: custom:roomba-vacuum-card
  entity: sensor.vacuum
```

Advanced configuration:
```yaml
- type: custom:roomba-vacuum-card
  entity: sensor.vacuum
  image: /local/img/different_vacuum.png
  name: Bump
  clean_base: false
  buttons:
    blank: false
    stop: true
  labels:
    status: Estado
    battery: Batería
    mode: Modo
    area_cleaned: Zona
    job_time: Hora
    total_jobs: Trabajos
    evac_events: Envases
```

## Disclaimer

This project is not affiliated, associated, authorized, endorsed by, or in any way officially connected with the iRobot Corporation,
or any of its subsidiaries or its affiliates. The official iRobot website can be found at https://www.irobot.com

## Credits

- [Ben Tomlin](https://github.com/benct) for creating the [xiaomi-vacuum-card](https://github.com/benct/lovelace-xiaomi-vacuum-card) from which this is shamelessly derived from!
- [Facu ZAK](https://github.com/koalazak) for creating dorita980 and rest980 !

## My Repos

[ha-rest980-roomba](https://github.com/jeremywillans/ha-rest980-roomba) | 
[roomba-vacuum-card](https://github.com/jeremywillans/lovelace-roomba-vacuum-card) | 
[hass-addons](https://github.com/jeremywillans/hass-addons) | 

[![BMC](https://www.buymeacoffee.com/assets/img/custom_images/white_img.png)](https://www.buymeacoffee.com/jeremywillans)
