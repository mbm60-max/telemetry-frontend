interface CompoundDataType {
    wear: number;
    durability: number;
    grip: number;
  }
 const CompoundData: { [key: string]: CompoundDataType } = {
    "NONE": { wear: 0, durability: 0, grip: 0},
    "Comfort: Hard (CH)": { wear: 20, durability: 50, grip: 20 },
    "Comfort: Medium (CM)": { wear:30, durability:40, grip: 30 },
    "Comfort: Soft (CS)": { wear:40, durability:30, grip: 40 },
    "Sports: Hard (SH)": { wear:40, durability:70, grip: 40 },
    "Sports: Medium (SM)": { wear:50, durability:60, grip: 50 },
    "Sports: Soft (SS)": { wear:60, durability:50, grip: 60 },
    "Racing: Hard (RH)": { wear:60, durability:80, grip: 60 },
    "Racing: Medium (RM)": { wear:70, durability:60, grip: 70 },
    "Racing: Soft (RS)": { wear:80, durability:50, grip: 80 },
    "Racing: Super Soft (RSS)": { wear:100, durability:30, grip: 100 },
    "Racing: Intermediate (RI)": { wear:60, durability:70, grip: 50 },
    "Racing: Heavy Wet (RH)": { wear:50, durability:70, grip: 40 },
    "Dirt Tires": { wear:10, durability:50, grip: 90 },
  };
  export default CompoundData