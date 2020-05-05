# roomba-vacuum-card

HA Lovelace Card for iRobot Roomba Vacuum Cleaner leveraging the rest980 Docker Image

Please refer my [ha-rest980-roomba] GitHub Repository for detailed instructions for using this card.

[![gh_release]](../../releases)
[![gh_last_commit]](../../commits/master)
[![hacs_custom]][hacs]

![roomba-vacuum-card](https://raw.githubusercontent.com/jeremywillans/lovelace-roomba-vacuum-card/master/examples/default.png)

## Setup

Install using [HACS][hacs] using the following custom plugin repository ```https://github.com/jeremywillans/lovelace-roomba-vacuum-card```
```yaml
resources:
  - type: module
    url: /community_plugin/lovelace-roomba-vacuum-card/roomba-vacuum-card.js
```

OR 

Manually add [roomba-vacuum-card.js] and [vacuum.png]
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
| attributes | object/bool | *(see below)* | Customize attribute fields
| labels | object/bool | *(see below)* | Customize label fields
| vac_states | object/bool | *(see below)* | Customize vacuum states
| maint | bool | true | Display maintenance status
| clean_base | bool | true | If no Clean Base, Set to `false` to show Bin Status
| totals | bool | true | Show Total Stats on Right
| job | bool | true | Show Job Stats on Right
| defaultTotals | bool | true | Shows Total Stats by default when not cleaning
| autoswitch | bool | true | Auto switches to Job Stats when cleaning

### Buttons object

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| startstop | bool | `true` | Show or hide start button
| stop | bool | `false` | Show or hide stop button - enable blank (below) if you disable this
| blank | bool | `true` | Show or hide blank button - splits startstop and dock if stop is disabled
| dock | bool | `true` | Show or hide dock/empty button
| find | bool | `false` | Show or hide find button - not yet implemented in rest980

### Attributes object

Customize attribute fields.

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| status | string | `state` | Change status attribute
| mode | string | `phase` | Change mode attribute
| battery | string | `battery` | Change battery attribute
| clean_base | string | `clean_base` | Change clean base attribute
| bin | string | `bin` | Change bin attribute
| maint_due | string | `maint_due` | Change maintenance due attribute (boolean)
| total_area | string | `area_cleaned` | Change total area cleaned attribute
| total_time | string | `job_time` | Change total job time attribute
| total_jobs | string | `total_jobs` | Change total jobs attribute
| evac_events | string | `evac_events` | Change clean base empties attribute (for Clean Base)
| job_initiator | string | `last_job` | Change current/last mission job initiator attribute
| job_time | string | `last_job_time` | Change current/last mission area cleaned attribute
| job_recharge | string | `last_job_recharge_time` | Change current/last mission recharge minutes attribute
| job_area | string | `last_job_area` | Change current/last mission area cleaned attribute

### Labels object

Customize or translate label names.

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| status | string | `Status` | Change status label
| mode | string | `Mode` | Change mode label
| battery | string | `Battery` | Change battery label
| clean_base | string | `Clean Base` | Change clean base label
| bin | string | `Bin` | Change bin label
| total_area | string | `Area` | Change total area cleaned label
| total_time | string | `Time` | Change total job time label
| total_jobs | string | `Jobs` | Change total jobs label
| evac_events | string | `Evacs` | Change clean base empties label (for Clean Base)
| job_initiator | string | `Source` | Change current/last mission job initiator label
| job_time | string | `Time` | Change current/last mission area time label
| job_recharge | string | `Recharge` | Change current/last mission recharge minutes label
| job_area | string | `Area` | Change current/last mission area cleaned label

### Vac_States object

Customize or translate vacuum states as defined in vacuum.yaml.

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| ready | string | `Ready` | Change Ready state
| stuck | string | `Stuck` | Change Stuck state
| pending | string | `Pending` | Change Pending state
| charge | string | `Charge` | Change Charge state
| idle | string | `Idle` | Change Idle state
| empty | string | `Empty` | Change Empty state

## Examples

Default

![roomba-vacuum-card](https://raw.githubusercontent.com/jeremywillans/lovelace-roomba-vacuum-card/master/examples/default.png)

Default - Jobs Page

![roomba-vacuum-card](https://raw.githubusercontent.com/jeremywillans/lovelace-roomba-vacuum-card/master/examples/default-jobs.png)

Hidden Title/Name and Maintenance

![roomba-vacuum-card-no-title](https://raw.githubusercontent.com/jeremywillans/lovelace-roomba-vacuum-card/master/examples/no-title.png)

Hidden Button Row (with Maintenance Due)

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
    blank: true
    stop: false
  labels:
    status: Estado
    battery: Batería
    mode: Modo
    area_cleaned: Zona
    job_time: Hora
    total_jobs: Trabajos
    evac_events: Envases
```
## Support

Got questions? Please post them [here][forum].

In case you've found a bug, please [open an issue on GitHub](../../issues).

## Disclaimer

This project is not affiliated, associated, authorized, endorsed by, or in any way officially connected with the iRobot Corporation,
or any of its subsidiaries or its affiliates. The official iRobot website can be found at https://www.irobot.com

## Credits

- [Ben Tomlin][benct] for creating the [xiaomi-vacuum-card](https://github.com/benct/lovelace-xiaomi-vacuum-card) from which this is shamelessly derived from!
- [Facu ZAK][facuzak] for creating dorita980 and rest980 !

## My Repos

[ha-rest980-roomba] | 
[roomba-vacuum-card] | 
[hass-addons] | 
[event-emitter]

[![BMC]](https://www.buymeacoffee.com/jeremywillans)


[gh_release]: https://img.shields.io/github/v/release/jeremywillans/lovelace-roomba-vacuum-card.svg?style=for-the-badge
[gh_last_commit]: https://img.shields.io/github/last-commit/jeremywillans/lovelace-roomba-vacuum-card.svg?style=for-the-badge
[hacs_custom]: https://img.shields.io/badge/HACS-Custom-orange.svg?style=for-the-badge
[hacs]: https://github.com/custom-components/hacs

[roomba-vacuum-card.js]: https://raw.githubusercontent.com/jeremywillans/lovelace-roomba-vacuum-card/master/dist/roomba-vacuum-card.js
[vacuum.png]: https://raw.githubusercontent.com/jeremywillans/lovelace-roomba-vacuum-card/master/dist/vacuum.png

[facuzak]: https://github.com/koalazak
[rest980]: https://github.com/koalazak/rest980
[dorita980]: https://github.com/koalazak/rest980
[gotschi]: https://community.home-assistant.io/u/gotschi/summary
[benct]: https://github.com/benct
[xiaomi-vacuum-card]: https://github.com/benct/lovelace-xiaomi-vacuum-card

[ha-rest980-roomba]: https://github.com/jeremywillans/ha-rest980-roomba
[roomba-vacuum-card]: https://github.com/jeremywillans/lovelace-roomba-vacuum-card
[hass-addons]: https://github.com/jeremywillans/hass-addons
[event-emitter]: https://github.com/jeremywillans/event-emitter
[BMC]: https://www.buymeacoffee.com/assets/img/custom_images/white_img.png

[forum]: https://community.home-assistant.io/t/irobot-roomba-i7-configuration-using-rest980/161175
