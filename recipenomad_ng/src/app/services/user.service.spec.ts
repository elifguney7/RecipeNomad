import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a new user', () => {
    const dummyUser = { username: 'testUser', password: 'password' };

    service.createUser(dummyUser).subscribe(response => {
      expect(response).toEqual(dummyUser);
    });

    const req = httpMock.expectOne('http://localhost:3000/users');
    expect(req.request.method).toBe('POST');
    req.flush(dummyUser);
  });

  it('should login user and save token', () => {
    const credentials = { email: 'test@test.com', password: 'password' };
    const dummyResponse = { token: 'dummyToken' };

    service.loginUser(credentials).subscribe(response => {
      expect(response).toEqual(dummyResponse);
      expect(localStorage.getItem('token')).toEqual(dummyResponse.token);
    });

    const req = httpMock.expectOne('http://localhost:3000/users/login');
    expect(req.request.method).toBe('POST');
    req.flush(dummyResponse);
  });

  it('should get user profile', () => {
    const dummyProfile = { username: 'testUser', email: 'test@test.com' };
    localStorage.setItem('token', 'dummyToken');

    service.getUserProfile().subscribe(response => {
      expect(response).toEqual(dummyProfile);
    });

    const req = httpMock.expectOne('http://localhost:3000/users/profile');
    expect(req.request.method).toBe('GET');
    req.flush(dummyProfile);
  });

  it('should update user', () => {
    const userId = '123';
    const updatedUser = { username: 'updatedUser', email: 'updated@test.com' };

    service.updateUser(userId, updatedUser).subscribe(response => {
      expect(response).toEqual(updatedUser);
    });

    const req = httpMock.expectOne(`http://localhost:3000/users/${userId}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedUser);
  });

  it('should delete user', () => {
    const userId = '123';

    service.deleteUser(userId).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`http://localhost:3000/users/${userId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should get list of users', () => {
    const dummyUsers = [{ username: 'user1' }, { username: 'user2' }];

    service.getUsers().subscribe(response => {
      expect(response).toEqual(dummyUsers);
    });

    const req = httpMock.expectOne('http://localhost:3000/users');
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsers);
  });
});
