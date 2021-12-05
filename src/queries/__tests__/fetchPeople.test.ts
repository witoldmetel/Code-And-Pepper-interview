import fetchPeople from '../fetchPeople';

describe('fetchPeople', () => {
  const mockedData = [
    {
      count: 1,
      results: ['Character 1']
    }
  ];

  const mockedAPI = (promise: Promise<{ status: number; data?: { count: number; results: string[] }[] }>) =>
    jest.spyOn(global, 'fetch').mockImplementation(
      () =>
        Promise.resolve({
          json: () => promise
        }) as Promise<Response>
    );

  it('should return status code 200 and a defined body as response', async () => {
    mockedAPI(
      Promise.resolve({
        status: 200,
        data: mockedData
      })
    );

    const result = await fetchPeople(1);

    expect(result.status).toBe(200);
    expect(result.data).toBe(mockedData);
  });

  it('should catch error', async () => {
    mockedAPI(
      Promise.resolve({
        status: 500
      })
    );

    const result = await fetchPeople(1);

    expect(result.status).toBe(500);
    expect(result.data).not.toBeDefined();
  });
});
