export function mockWindow() {
  // @ts-expect-error mock window
  global.window = global;
  // @ts-expect-error mock document
  global.document = {
    createElement: jest.fn().mockReturnValue({
      getContext: jest.fn(),
      getBoundingClientRect: jest.fn().mockReturnValue({
        toJSON: jest.fn().mockReturnValue({
          x: 8,
          y: 8,
          width: 1002,
          height: 102,
          top: 8,
          right: 1010,
          bottom: 110,
          left: 8
        })
      })
    })
  };
}
