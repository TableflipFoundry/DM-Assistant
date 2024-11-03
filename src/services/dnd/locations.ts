export interface Settlement {
  type: 'Thorp' | 'Hamlet' | 'Village' | 'Small Town' | 'Large Town' | 'Small City' | 'Large City' | 'Metropolis';
  populationRange: {
    min: number;
    max: number;
  };
  services: {
    inns?: number;
    taverns?: number;
    temples?: number;
    shops?: number;
    marketplaces?: number;
  };
  governance: {
    type: string;
    leadership: string[];
  };
}

export const settlementTypes: { [key: string]: Settlement } = {
  Thorp: {
    type: 'Thorp',
    populationRange: { min: 20, max: 80 },
    services: {
      inns: 0,
      taverns: 1,
      temples: 0,
      shops: 1
    },
    governance: {
      type: 'Elder or Council',
      leadership: ['Village Elder']
    }
  },
  Hamlet: {
    type: 'Hamlet',
    populationRange: { min: 81, max: 400 },
    services: {
      inns: 1,
      taverns: 1,
      temples: 1,
      shops: 2
    },
    governance: {
      type: 'Council',
      leadership: ['Council Members', 'Reeve']
    }
  }
  // Add other settlement types
};