((LitElement) => {
  const html = LitElement.prototype.html;
  const css = LitElement.prototype.css;

  class RoombaVacuumCard extends LitElement {

      static get properties() {
          return {
              _hass: {},
              _config: {},
              stateObj: {},
              state: {},
              style: {}
          }
      }

      static get styles() {
          return css`
      .background {
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
      }
      .title-left {
        font-size: 20px;
        padding: 16px 16px 0;
        text-align: left;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .title-right {
        font-size: 18px;
        padding: 16px 16px 0;
        text-align: right;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .content {
        cursor: pointer;
      }
      .flex {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
      }
      .button {
        cursor: pointer;
        padding: 16px;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(2, auto);
      }
      .grid-content {
        display: grid;
        align-content: space-between;
        grid-row-gap: 6px;
      }
      .grid-left {
        text-align: left;
        font-size: 110%;
        padding-left: 10px;
        border-left: 2px solid var(--primary-color);
      }
      .grid-right {
        text-align: right;
        padding-right: 10px;
        border-right: 2px solid var(--primary-color);
      }`;
      }

      render() {
          return html`
          <ha-card .hass="${this._hass}" .config="${this._config}" class="background" style="${this.style.background}">
            ${this.state.showTitle ?
            html`<div class="grid" @click="${() => this.fireEvent('hass-more-info')}">
              ${this.state.name ?
              html`<div class="title-left" style="${this.style.text}" @click="${() => this.fireEvent('hass-more-info')}">${this.state.name}</div>` : html`<div class="title-left" style="${this.style.text}" @click="${() => this.fireEvent('hass-more-info')}"></div>`}
              ${this.state.showMaint ?
              html`<div class="title-right" style="${this.style.text}" @click="${() => this.fireEvent('hass-more-info')}"><ha-icon icon="mdi:wrench" style="padding-bottom: 5px"></ha-icon> <ha-icon icon="${this.getMaintStatus('icon')}" style="padding-bottom: 5px; color:${this.getMaintStatus('color')}"></ha-icon></div>` : null}
            </div>` : null }
            ${this.state.showLabels ? html`
            <div class="content grid" style="${this.style.content + this.style.text}" @click="${() => this.fireEvent('hass-more-info')}">
              <div class="grid-content grid-left">
                <div>${this.getState('status')}</div>
                <div>${this.getValue('mode')}</div>
                <div>${this.getValue('battery')}</div>
                <div>${this.getValue('clean_base')}</div>
              </div>
              ${this.state.showStats ? html`
              <div class="grid-content grid-right" >
                <div>${this.getValue('area_cleaned')}</div>
                <div>${this.getValue('job_time')}</div>
                <div>${this.getValue('total_jobs')}</div>
                <div>${this.getValue('evac_events')}</div>
              </div>` : null}
            </div>` : null}
            ${this.state.showButtons ? html`
            <div class="flex" style="${this.style.text}">
              ${Object.keys(this.state.buttons).map(this.renderButton.bind(this))}
            </div>` : null}
          </ha-card>`;
      }

      renderButton(key) {
          if (key != "blank") {
            return this.state.buttons[key]
              ? html`<div class="button" @tap="${() => this.callService(key)}"><ha-icon icon="${this.getButton(key,"icon")}"></ha-icon>  ${this.getButton(key,"label")}</div>`
              : null;
          } else {
            return this.state.buttons[key]
              ? html`<div class="button" style="cursor:default"></div>`
              : null;
          }
      }

      getValue(field) {
          if ((field === 'clean_base') && (!this.state.cleanBase)) { 
            field = this.state.attributes.bin;
            const bin_check = this.state.attributes.bin_present;
            const value = (this.stateObj && this.state.attributes[bin_check] in this.stateObj.attributes)
              ? this.stateObj.attributes[this.state.attributes[bin_check]]
              : (this._hass ? this._hass.localize('state.default.unavailable') : 'Unavailable');
            if (value === 'No') {
              return `${this.state.labels[field]}: Missing!`;
            };
           };
          if ((field === 'evac_events') && (!this.state.cleanBase)) {  return `` };
          const value = (this.stateObj && this.state.attributes[field] in this.stateObj.attributes)
              ? this.stateObj.attributes[this.state.attributes[field]]
              : (this._hass ? this._hass.localize('state.default.unavailable') : 'Unavailable');
          return `${this.state.labels[field]}: ${value}`;
      };

      getState(field) {
        const value = this.stateObj.state 
        return `${this.state.labels[field]}: ${value}`;
      };

      getMaintStatus(field) {
        switch(field) {
          case "icon":
            if (this.stateObj.attributes['maint_due'] === 'true') {
              return `mdi:alert`;
            } else {
              return `mdi:checkbox-marked`;
            }
          case "color":
            if (this.stateObj.attributes['maint_due'] === 'true') {
              return `red`;
            } else {
              return `green`;
            }
        }       
      };

      getButton(index, field) {
        switch(index) {
          case "startstop":
            if (this.stateObj.state === 'Ready') {
              // Full Clean
              switch(field) {
                case "label":
                  return `Full Clean`;
                case "icon":
                  return `mdi:play`;
                case "action":
                  return `start`;
              }
            } else if ((this.stateObj.attributes['phase'] === 'Paused') || (this.stateObj.attributes['phase'] === 'Stuck') || (this.stateObj.attributes['phase'] === 'Charge')) {
              // Resume
              switch(field) {
                case "label":
                  return `Resume`;
                case "icon":
                  return `mdi:play-pause`;
                case "action":
                    return `resume`;
              }
            } else {
              // Pause
              switch(field) {
                case "label":
                  return `Pause`;
                case "icon":
                  return `mdi:pause`;
                case "action":
                    return `pause`;
              }

            }
          case "dock":
            if ((this.stateObj.attributes['phase'] === 'Charge') || (this.stateObj.attributes['phase'] === 'Idle') || (this.stateObj.attributes['phase'] === 'Empty')) {
              // Resume
              switch(field) {
                case "label":
                  return `Empty Bin`;
                case "icon":
                  return `mdi:home-minus`;
                case "action":
                    return `dock`;
              }
            } else {
              // Pause
              switch(field) {
                case "label":
                  return `Dock`;
                case "icon":
                  return `mdi:home-minus`;
                case "action":
                    return `dock`;
              }
            }
          case "stop":
            // Stop
            switch(field) {
              case "label":
                return `Stop`;
              case "icon":
                return `mdi:stop`;
              case "action":
                return `stop`;
            }
          case "find":
            // Fina - NOT IMPLEMENTED YET
            switch(field) {
              case "label":
                return `Find`;
              case "icon":
                return `mdi:map-marker`;
              case "action":
                return `find`; 
              }
        }       
      };

      callService(service) {
          this._hass.callService('rest_command', 'vacuum_action', {command: this.getButton(service,"action")});
      }

      fireEvent(type, options = {}) {
          const event = new Event(type, {
              bubbles: options.bubbles || true,
              cancelable: options.cancelable || true,
              composed: options.composed || true,
          });
          event.detail = {entityId: this.stateObj.entity_id};
          this.dispatchEvent(event);
      }

      getCardSize() {
          if (this.state.name && this.state.showButtons) return 5;
          if (this.state.name || this.state.showButtons) return 4;
          return 3;
      }

      setConfig(config) {
          const labels = {
              status: 'Status',
              mode: 'Mode',
              battery: 'Battery',
              clean_base: 'Clean Base',
              bin: 'Bin',
              area_cleaned: 'Area',
              job_time: 'Time',
              total_jobs: 'Jobs',
              evac_events: 'Evacs',
              maint: 'Maint',
          };

          const attributes = {
              status: 'state',
              battery: 'battery',
              mode: 'phase',
              clean_base: 'clean_base',
              bin: 'bin',
              bin_present: 'bin_present',
              area_cleaned: 'area_cleaned',
              job_time: 'job_time',
              total_jobs: 'total_jobs',
              evac_events: 'evac_events',
              maint_due: 'maint_due',
          };

          const buttons = {
              startstop: true,
              blank: true,
              dock: true,
              stop: false,
              find: false, // Not implemented in rest980
          };

          if (!config.entity) throw new Error('Please define an entity.');
          if (config.entity.split('.')[0] !== 'sensor') throw new Error('Please define a sensor entity.');

          this.state = {
              showStats: config.stats !== false,
              showButtons: config.buttons !== false,
              showMaint: config.maint !== false,
              showLabels: config.labels !== false,
              showName: config.name !== false,
              cleanBase: config.clean_base !== false,
              showTitle: (config.name !== false || config.maint !== false),

              buttons: Object.assign({}, buttons, config.buttons),
              attributes: Object.assign({}, attributes, config.attributes),
              labels: Object.assign({}, labels, config.labels),
          };

          this.style = {
              text: `cursor: pointer; color: ${config.image !== false ? 'white; text-shadow: 0 0 10px black;' : 'var(--primary-text-color);'}`,
              content: `padding: ${config.showButtons ? '16px 16px 4px' : '16px'};`,
              background: config.image !== false ? `background-image: url('${config.image || '/community_plugin/lovelace-roomba-vacuum-card/vacuum.png'}')` : ''
          };

          this._config = config;
      }

      set hass(hass) {
          this._hass = hass;

          if (hass && this._config) {
              this.stateObj = this._config.entity in hass.states ? hass.states[this._config.entity] : null;

              if (this.stateObj && this.state.showName) {
                  this.state.name = this._config.name || this.stateObj.attributes.friendly_name;
              }
          }
      }
  }

  customElements.define('roomba-vacuum-card', RoombaVacuumCard);
})(window.LitElement || Object.getPrototypeOf(customElements.get("hui-view")));