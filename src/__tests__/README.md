# Test Suite Documentation

This directory contains a simple test for the GET /api/users endpoint.

## Test Structure

```
src/__tests__/
├── setup.ts                    # Test configuration and mocks
└── userGetEndpoint.test.ts     # Test for GET /api/users endpoint
```

## Test Coverage

The test covers the GET /api/users endpoint with:

- ✅ **Success Case**: Returns all users successfully
- ✅ **Empty Case**: Returns empty array when no users exist
- ✅ **Error Case**: Returns 500 when database error occurs

## Running Tests

### All Tests
```bash
npm test
```

### Watch Mode (Development)
```bash
npm run test:watch
```

### Coverage Report
```bash
npm run test:coverage
```

## Mock Strategy

- **Database Mocks**: UserRepository is mocked to avoid real database connections
- **HTTP Testing**: Uses supertest for testing the actual HTTP endpoint

## Test Structure

Each test follows the **Arrange-Act-Assert** pattern:
1. **Arrange**: Set up mock data and expectations
2. **Act**: Make the HTTP request
3. **Assert**: Verify the response and mock calls

## Example Test

```typescript
it('should return all users successfully', async () => {
  // Arrange
  const mockUsers = [/* test data */];
  mockRepository.retrieveAll.mockResolvedValue(mockUsers);

  // Act
  const response = await request(app).get('/api/users').expect(200);

  // Assert
  expect(response.body).toEqual({
    status: 'OK',
    message: 'Successfully fetched all users!',
    data: mockUsers,
  });
});
```
