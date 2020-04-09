import { periodConverter } from './util';

const covid19ImpactEstimator = (data) => {
  const {
    periodType, timeToElapse, reportedCases, totalHospitalBeds, region
  } = data;
  const impact = {};
  const severeImpact = {};

  // challenge 1
  impact.currentlyInfected = reportedCases * 10;
  impact.infectionsByRequestedTime = 2 ** (Math.floor(periodConverter(periodType, timeToElapse)
  / 3)) * impact.currentlyInfected;

  severeImpact.currentlyInfected = reportedCases * 50;
  severeImpact.infectionsByRequestedTime = 2 ** (Math.floor(
    periodConverter(periodType, timeToElapse) / 3
  )) * severeImpact.currentlyInfected;

  //   Challenge 2
  impact.severeCasesByRequestedTime = 0.15 * impact.infectionsByRequestedTime;
  const bedAvailable = 0.35 * totalHospitalBeds;
  if (bedAvailable > impact.severeCasesByRequestedTime) {
    impact.hospitalBedsByRequestedTime = Math.floor(bedAvailable
    - impact.severeCasesByRequestedTime);
  } else {
    impact.hospitalBedsByRequestedTime = -1 * Math.floor(Math.abs(bedAvailable
      - impact.severeCasesByRequestedTime));
  }

  severeImpact.severeCasesByRequestedTime = 0.15 * severeImpact.infectionsByRequestedTime;

  const severeBedAvailable = 0.35 * totalHospitalBeds;

  if (severeBedAvailable > severeImpact.severeCasesByRequestedTime) {
    severeImpact.hospitalBedsByRequestedTime = Math.floor(severeBedAvailable
    - severeImpact.severeCasesByRequestedTime);
  } else {
    severeImpact.hospitalBedsByRequestedTime = -1 * Math.floor(Math.abs(severeBedAvailable
      - severeImpact.severeCasesByRequestedTime));
  }


  // Challenge 3
  impact.casesForICUByRequestedTime = Math.floor(0.05 * impact.infectionsByRequestedTime);
  impact.casesForVentilatorsByRequestedTime = Math.floor(0.02 * impact.infectionsByRequestedTime);
  impact.dollarsInFlight = Math.floor(impact.infectionsByRequestedTime
    * region.avgDailyIncomePopulation * region.avgDailyIncomeInUSD
    * periodConverter(periodType, timeToElapse));

  severeImpact.casesForICUByRequestedTime = Math.floor(0.05
    * severeImpact.infectionsByRequestedTime);
  severeImpact.casesForVentilatorsByRequestedTime = Math.floor(0.02
    * severeImpact.infectionsByRequestedTime);

  const severeAvgDailyIncome = severeImpact.infectionsByRequestedTime
      * region.avgDailyIncomePopulation * region.avgDailyIncomeInUSD
      * periodConverter(periodType, timeToElapse);

  severeImpact.dollarsInFlight = Math.floor(severeAvgDailyIncome);


  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
