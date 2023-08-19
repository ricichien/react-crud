class SolarSystemCalculator {
  static PANEL_POWER_WATT = 550;
  static PANEL_LENGTH = 1.95;
  static PANEL_WIDTH = 1.1;
  static PANELS_PER_INVERTER = 4;

  calculateSolarSystem(maxPowerKiloWatt) {
    const maxPowerWatt = this.toWatt(maxPowerKiloWatt);
    const numPanels = this.calculateNumPanels(maxPowerWatt);
    const numInverters = this.calculateNumInverters(numPanels);
    const lengthNeeded = numPanels * SolarSystemCalculator.PANEL_WIDTH;
    const areaNeeded = lengthNeeded * SolarSystemCalculator.PANEL_LENGTH;

    return {
      panels: numPanels,
      inverters: numInverters,
      panelPower: SolarSystemCalculator.PANEL_POWER_WATT,
      length: lengthNeeded,
      usefulArea: areaNeeded,
    };
  }

  toWatt(maxPowerKiloWatt) {
    return maxPowerKiloWatt * 1000;
  }

  calculateNumPanels(maxPowerWatt) {
    return Math.ceil(maxPowerWatt / SolarSystemCalculator.PANEL_POWER_WATT);
  }

  calculateNumInverters(numPanels) {
    return Math.ceil(numPanels / SolarSystemCalculator.PANELS_PER_INVERTER);
  }
}

export default SolarSystemCalculator;
