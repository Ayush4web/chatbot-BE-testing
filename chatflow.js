const chatFlow = {
  startNode: 'node1',
  nodes: {
    node1: {
      type: 'options',
      message: `Hi there👋 I am Johannes.
      Welcome to Gutenberg! What brought you our website today?`,
      options: [
        { label: 'I am intrested in your range services', value: 'services' },
        {
          label: 'I am just browsing seeking inspiration',
          value: 'explore',
        },
      ],
      next: {
        services: 'node2',
        explore: 'node3',
      },
    },
    node2: {
      type: 'options',
      message: 'Would you like to know more about our services?',
      options: [
        { label: 'Public Relations', value: 'name' },
        { label: 'Branding', value: 'name' },
        { label: 'Digital Marketing', value: 'name' },
        { label: 'Content Marketing', value: 'name' },
        { label: 'Social Media Management', value: 'name' },
        { label: 'Website Design', value: 'name' },
        { label: 'Video Production', value: 'name' },
      ],
      api: true,
      multiple: true,
      next: 'node4',
    },
    node3: {
      type: 'input',
      message:
        "Well, I don't mean to pry, but I'm dying to know - what should I call you?",
      options: [
        { label: 'Yes', value: 'exploreY' },
        { label: 'No', value: 'exploreN' },
      ],
      variable: 'name',
      next: {
        exploreY: 'node5',
        exploreN: 'node19',
      },
    },
    node4: {
      type: 'input',
      message:
        "Well, I don't mean to pry, but I'm dying to know - what should I call you?",
      options: [
        { label: 'Yes', value: 'nameY' },
        { label: 'No', value: 'nameN' },
      ],
      variable: 'name',
      next: {
        nameY: 'node5',
        nameN: 'node6',
      },
    },
    node5: {
      type: 'message',
      modify: 'name',
      message: `Great to meet you, {{}}!`,
      continue: true,
      next: 'node7',
    },
    node6: {
      type: 'message',
      message: `No worries, mystery person!`,
      next: 'node7',
    },
    node7: {
      type: 'GPTCall',
      modify: 'name',
      message:
        "{{}}, is there anything you would like to know? Let's get started!",
      next: 'node8',
    },
    node8: {
      type: 'input',
      modify: 'name',
      message:
        "{{}}, I'm curious to know - which company do you work with? Just to help me understand how I can better serve you and your needs.",
      variable: 'company',
      options: [
        { label: 'Yes', value: 'companyY' },
        { label: 'No', value: 'companyN' },
      ],
      next: {
        companyY: 'node9',
        companyN: 'node10',
      },
    },
    node9: {
      type: 'input',
      modify: 'name',
      message:
        '{{}}, may I have your email address? Just in case this awesome connection gets disconnected.',
      variable: 'email',
      options: [
        { label: 'Yes', value: 'sector' },
        { label: 'No', value: 'emailN' },
      ],
      next: {
        sector: 'node10',
        emailN: 'node18',
      },
    },
    node10: {
      type: 'options',
      modify: 'name',
      message: '{{}}, what vertical or sector is your company in?',
      options: [
        { label: 'IT Services', value: 'targetGeography' },
        { label: 'Technology', value: 'targetGeography' },
        { label: 'Healthcare', value: 'targetGeography' },
        { label: 'Financial Services', value: 'targetGeography' },
        { label: 'Consumer', value: 'targetGeography' },
        { label: 'Other', value: 'targetGeography' },
      ],
      api: true,
      multiple: true,
      next: 'node11',
    },
    node11: {
      type: 'options',
      modify: 'name',
      message: '{{}}, what is your target geography?',
      options: [
        { label: 'US', value: 'budget' },
        { label: 'UK', value: 'budget' },
        { label: 'India', value: 'budget' },
        { label: 'Singapore', value: 'budget' },
        { label: 'Others', value: 'budget' },
      ],
      api: true,
      multiple: true,
      next: 'node12',
    },
    node12: {
      type: 'input',
      modify: 'name',
      message: '{{}}, I would like to know the budgets for your project',
      variable: 'budget',
      options: [
        { label: 'Yes', value: 'qAndA' },
        { label: 'No', value: 'qAndA' },
      ],
      next: {
        qAndA: 'node13',
      },
    },
    node13: {
      type: 'GPTCall',
      modify: 'name',
      message: '{{}}, is there anything else I can assist you with?',
      next: 'node14',
    },
    node14: {
      type: 'GPTCall',
      modify: 'name',
      message: '{{}}, is there something else you want to know?',
      next: 'node15',
    },
    node15: {
      type: 'options',
      modify: 'name',
      message:
        '{{}},  I would like to keep you updated on the latest cool stuff happening in the industry.',
      options: [
        { label: 'Yes', value: 'newsletterY' },
        { label: 'No', value: 'newsletterN' },
      ],
      next: {
        newsletterY: 'node16',
        newsletterN: 'node17',
      },
    },
    node16: {
      type: 'message',
      modify: 'name',
      message:
        "{{}}, You're now officially a part of our inner circle 🎉. If you need any help or have any questions, don't hesitate to reach out.  Have a great day! 🤗",
      next: null,
    },
    node17: {
      type: 'message',
      modify: 'name',
      message:
        "No worries, If you need any help or have any questions, don't hesitate to reach out.  Have a great day! 🤗",
      next: null,
    },
    node18: {
      type: 'GPTCall',
      message: 'Is there anything I can assist you with?',
      next: 'node15',
    },

    node19: {
      type: 'options',
      message: 'Would you like to know more about our services?',
      options: [
        { label: 'Public Relations', value: 'name' },
        { label: 'Branding', value: 'name' },
        { label: 'Digital Marketing', value: 'name' },
        { label: 'Content Marketing', value: 'name' },
        { label: 'Social Media Management', value: 'name' },
        { label: 'Website Design', value: 'name' },
        { label: 'Video Production', value: 'name' },
      ],
      api: true,
      multiple: true,
      next: 'node7',
    },
  },
}
