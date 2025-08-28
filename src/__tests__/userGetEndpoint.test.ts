import request from 'supertest';
import express from 'express';
import UserRoutes from '../data/routes/UserRoutes';
import { UserRepository } from '../data/repositories/UserRepository';

// Mock the UserRepository
jest.mock('../data/repositories/UserRepository');

const MockedUserRepository = UserRepository as jest.MockedClass<typeof UserRepository>;

describe('GET /api/users Endpoint', () => {
  let app: express.Application;
  let mockRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    // Create a fresh Express app for each test
    app = express();
    app.use(express.json());

    // Create mock repository instance
    mockRepository = {
      retrieveAll: jest.fn(),
    } as any;

    // Mock the UserRepository constructor
    MockedUserRepository.mockImplementation(() => mockRepository);

    // Mount the user routes
    app.use('/api', UserRoutes);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/users', () => {
    it('should return all users successfully', async () => {
      // Arrange
      const mockUsers = [
        {
          user_id: 1,
          user_name: 'Test User 1',
          createdAt: new Date('2024-01-15T10:00:00Z'),
          updatedAt: new Date('2024-01-15T10:00:00Z'),
        },
        {
          user_id: 2,
          user_name: 'Test User 2',
          createdAt: new Date('2024-01-15T11:00:00Z'),
          updatedAt: new Date('2024-01-15T11:00:00Z'),
        },
      ];
      mockRepository.retrieveAll.mockResolvedValue(mockUsers as any);

      // Act
      const response = await request(app)
        .get('/api/users')
        .expect(200);

      // Assert
      expect(response.body).toEqual({
        status: 'OK',
        message: 'Successfully fetched all users!',
        data: [
          {
            user_id: 1,
            user_name: 'Test User 1',
            createdAt: '2024-01-15T10:00:00.000Z',
            updatedAt: '2024-01-15T10:00:00.000Z',
          },
          {
            user_id: 2,
            user_name: 'Test User 2',
            createdAt: '2024-01-15T11:00:00.000Z',
            updatedAt: '2024-01-15T11:00:00.000Z',
          },
        ],
      });
      expect(mockRepository.retrieveAll).toHaveBeenCalled();
    });

    it('should return empty array when no users exist', async () => {
      // Arrange
      mockRepository.retrieveAll.mockResolvedValue([]);

      // Act
      const response = await request(app)
        .get('/api/users')
        .expect(200);

      // Assert
      expect(response.body).toEqual({
        status: 'OK',
        message: 'Successfully fetched all users!',
        data: [],
      });
    });

    it('should return 500 when database error occurs', async () => {
      // Arrange
      mockRepository.retrieveAll.mockRejectedValue(new Error('Database error'));

      // Act & Assert
      const response = await request(app)
        .get('/api/users')
        .expect(500);

      expect(response.body).toEqual({
        status: 'Internal Server Error!',
        message: 'Internal Server Error!',
      });
    });
  });
});
