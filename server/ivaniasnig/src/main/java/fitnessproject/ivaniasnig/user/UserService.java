package fitnessproject.ivaniasnig.user;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

import exceptions.BadRequestException;
import exceptions.NotFoundException;

@Repository
public class UserService {
	
	@Autowired
	private UserRepository userRepo;
	
	public User save(User user) {
		if(user.getPassword().length() < 6) {
			throw new BadRequestException("The password must contain at least 6 characters");
		}
		userRepo.findByEmail(user.getMail()).ifPresent(usr -> {
			throw new BadRequestException("email already in use");
		});
		
		return userRepo.save(user);
	}
	
	public Page<User> find(int page, int size, String sort){
		Pageable pageable=PageRequest.of(page, size, Sort.by(sort));
		return userRepo.findAll(pageable);
	}
	
	public User findById(UUID id) throws NotFoundException {
		return userRepo.findById(id).orElseThrow(() -> new NotFoundException(id));
	}
	
	public User findByIdAndUpdate(UUID id, User user) throws NotFoundException {
		User found = this.findById(id);
		found.setSurname(user.getSurname());
		found.setName(user.getName());
		found.setAge(user.getAge());
		found.setSex(user.getSex());
		found.setUsername(user.getMail());
		found.setMail(user.getMail());
		
		return userRepo.save(found);
	}
	
	public void findByIdAndDelete(UUID id) throws NotFoundException {
		User found = this.findById(id);
		userRepo.delete(found);
	}
	
	public User findByEmail(String email) {
		return userRepo.findByEmail(email).orElseThrow(() -> new NotFoundException("User not found"));
	}
	
}
