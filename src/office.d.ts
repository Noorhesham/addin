declare namespace Office {
  interface Ribbon {
    requestUpdate(input: {
      tabs: Array<{
        id: string;
        groups: Array<{
          id: string;
          controls: Array<{
            id: string;
            enabled: boolean;
          }>;
        }>;
      }>;
    }): void;
  }

  const ribbon: Ribbon;
}

// Make TypeScript aware that there's a global Office object
declare global {
  // eslint-disable-next-line no-var
  var Office: typeof Office;
}
