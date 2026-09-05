import { describe, expect, it } from "vitest";
import { calculateScenario, formatPercent } from "./calculations";
import type { BuyingPowerScenarioInput, BuyingPowerSharedAssumptions } from "./types";
const shared: BuyingPowerSharedAssumptions={borrowerName:"",loanProgram:"conventional",termYears:30,defaultInterestRate:7,defaultDownPaymentPercent:5,annualPropertyTaxes:4800,annualHomeownersInsurance:2400,defaultMonthlyMortgageInsurance:150,monthlyHoa:100,defaultClosingCosts:10000,defaultSellerConcessions:0,defaultDiscountPointsPercent:0,defaultLenderCredits:0,prepaidEscrows:2000,earnestMoneyDeposit:null,targetMonthlyPayment:null,holdingPeriodYears:5};
const input=(overrides:BuyingPowerScenarioInput["overrides"]={}):BuyingPowerScenarioInput=>({id:"a",name:"A",purchasePrice:769000,notes:"",overrides});
describe("buying power scenario",()=>{
  it.each([[5,38450],[10,76900],[20,153800]])("derives %s%% down as $%s",(percent,amount)=>expect(calculateScenario(input({downPaymentPercent:percent}),shared).downPayment).toBe(amount));
  it("formats fractional percentages",()=>expect(formatPercent(3.5)).toBe("3.5%"));
  it("inherits default rate and honors overrides",()=>{expect(calculateScenario(input(),shared).interestRate).toBe(7);expect(calculateScenario(input({interestRate:6.5}),shared).interestRate).toBe(6.5)});
  it("preserves an explicit zero override",()=>expect(calculateScenario(input({monthlyMortgageInsurance:0}),shared).monthlyMortgageInsurance).toBe(0));
  it("caps seller concessions and reconciles cash",()=>{const r=calculateScenario(input({sellerConcessions:20000}),shared);expect(r.sellerConcessionsEntered).toBe(20000);expect(r.sellerConcessionsApplied).toBe(12000);expect(r.unusedSellerConcessions).toBe(8000);expect(r.cashToClose).toBe(r.downPayment+r.closingCosts+r.prepaidEscrows+r.discountPoints-r.sellerConcessionsApplied-r.lenderCreditsApplied-r.earnestMoneyDeposit)});
  it("never lets lender credits reduce down payment",()=>expect(calculateScenario(input({lenderCredits:999999}),shared).cashToClose).toBe(38450));
  it("subtracts earnest money",()=>expect(calculateScenario(input({earnestMoneyDeposit:5000}),shared).cashToClose).toBe(45450));
  it("applies scenario points and lender credits",()=>{const r=calculateScenario(input({discountPointsPercent:1,lenderCredits:1000}),shared);expect(r.discountPoints).toBe(7305.5);expect(r.lenderCreditsApplied).toBe(1000)});
  it("reconciles included payment components",()=>{const r=calculateScenario(input(),shared);expect(r.totalMonthlyHousingPayment).toBeCloseTo(r.monthlyPrincipalAndInterest+r.monthlyTaxes+r.monthlyInsurance+r.monthlyMortgageInsurance+r.monthlyHoa,2)});
  it("excludes unselected components",()=>{const r=calculateScenario(input(),shared,{propertyTaxes:false,homeownersInsurance:false,mortgageInsurance:true,hoa:true});expect(r.totalMonthlyHousingPayment).toBeCloseTo(r.monthlyPrincipalAndInterest+r.monthlyMortgageInsurance+r.monthlyHoa,2)});
});
