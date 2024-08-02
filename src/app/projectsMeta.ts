type ProjectMeta = {
  name: string;
  description: string;
  logoSrc: string;
  links: {
    notion: string;
  };
};

export const projectsMeta: {
  [key: string]: ProjectMeta;
} = {
  "0x7E1367998e1fe8Fab8f0bbF41e97cD6E0C891B64": {
    name: "Labour DAO",
    description:
      "A DAO supporting workers who want to organize in web3 and out.",
    logoSrc: "project/labor_dao.png",
    links: {
      notion:
        "https://breadchain.notion.site/Labor-DAO-cbb5a4c374494cada57ad6b1aff21323",
    },
  },
  "0x5405e2D4D12AAdB57579E780458c9a1151b560F1": {
    name: "Symbiota",
    description:
      "Event-focused organisations devoted to new forms of culture and enquiry.",
    logoSrc: "project/symbiota.png",
    links: {
      notion:
        "https://breadchain.notion.site/Symbiota-Coop-63a0ddf2702b4239b23d7eb0bf3141b7",
    },
  },
  "0x5c22B3F03b3d8FFf56C9B2e90151512Cb3F3dE0F": {
    name: "Crypto Commons",
    description:
      "Creating research and events on decentralized tech and the commons.",
    logoSrc: "project/cca.png",
    links: {
      notion:
        "https://breadchain.notion.site/Crypto-Commons-Association-77818c4f425942479835e8bfec0b951b",
    },
  },
  "0x918dEf5d593F46735f74F9E2B280Fe51AF3A99ad": {
    name: "Breadchain Core",
    description:
      "The core team developing the tech and design used by Breadchain.",
    logoSrc: "project/core.png",
    links: {
      notion:
        "https://breadchain.notion.site/Breadchain-Core-208dcd81c6da49d1b1b00635f727d902",
    },
  },
  "0x6A148b997e6651237F2fCfc9E30330a6480519f0": {
    name: "Breadchain Treasury",
    description:
      "A co-owned treasury in Breadchain used for grants and sponsorships.",
    logoSrc: "project/treasury.png",
    links: {
      notion:
        "https://breadchain.notion.site/Breadchain-Core-208dcd81c6da49d1b1b00635f727d902",
    },
  },
};
