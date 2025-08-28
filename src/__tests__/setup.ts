// Mock database connection for tests
jest.mock('../server/config/database', () => {
  return jest.fn().mockImplementation(() => ({
    sequelize: {
      sync: jest.fn().mockResolvedValue(undefined),
      authenticate: jest.fn().mockResolvedValue(undefined),
    },
  }));
});

// Set test environment
(process.env as any).NODE_ENV = 'test';
