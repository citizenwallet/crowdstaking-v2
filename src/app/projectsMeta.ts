type ProjectMeta = {
  name: string;
  description: string;
  logoSrc: string;
};

export const projectsMeta: {
  [key: string]: ProjectMeta;
} = {
  "0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097": {
    name: "Crypto Commons",
    description:
      "Creating research and events on decentralized tech and the commons.",
    logoSrc: "project/cca.png",
  },
  "0xcd3B766CCDd6AE721141F452C550Ca635964ce71": {
    name: "Labour DAO",
    description:
      "A DAO supporting workers who want to organize in web3 and out.",
    logoSrc: "project/labor_dao.png",
  },
  "0x2546BcD3c84621e976D8185a91A922aE77ECEc30": {
    name: "Symbiota",
    description:
      "Event-focused organisations devoted to new forms of culture and enquiry.",
    logoSrc: "project/symbiota.png",
  },
  "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E": {
    name: "Breadchain Core",
    description:
      "The core team developing the tech and design used by Breadchain.",
    logoSrc: "project/core.png",
  },
  "0xdD2FD4581271e230360230F9337D5c0430Bf44C0": {
    name: "Breadchain Treasury",
    description:
      "A co-owned treasury in Breadchain used for grants and sponsorships.",
    logoSrc: "project/treasury.png",
  },
};
