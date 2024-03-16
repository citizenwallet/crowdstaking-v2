type Project = {
  address: string;
  description: string;
  logo: string;
};

/**
 *  historical slices
 */

type SliceProject = {
  address: string;
  amount: string;
};

type Slice = {
  date: string;
  projects: SliceProject[];
};

/*

Just store metadata in JSON

Fetch walllet project wallet addresses to base Voting UI on from contract

*/
