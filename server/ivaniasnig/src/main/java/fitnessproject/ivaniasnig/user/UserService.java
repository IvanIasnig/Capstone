package fitnessproject.ivaniasnig.user;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import fitnessproject.ivaniasnig.customtable.CustomTable;
import fitnessproject.ivaniasnig.exceptions.BadRequestException;
import fitnessproject.ivaniasnig.exceptions.NotFoundException;

import org.springframework.data.domain.Pageable;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepo;
	
	public User save(UserRequestPayload body) {
		userRepo.findByMail(body.getMail()).ifPresent(u -> {
			throw new BadRequestException("L'email è gia presente del database");
		});
		User newUser = new User(body.getSurname(), body.getName(), body.getAge(), body.getSex(), body.getPassword(),  body.getMail(),
				body.getUsername(), body.getHeight(), body.getWeight(), body.getActivity());
		return userRepo.save(newUser);
	}
	
	public Page<User> find(int page, int size, String sort){
		Pageable pageable=PageRequest.of(page, size, Sort.by(sort));
		return userRepo.findAll(pageable);
	}
	
	public User findById(UUID id) throws NotFoundException {
		return userRepo.findById(id).orElseThrow(() -> new NotFoundException(id));
	}
	
	public List<CustomTable> findTablesById(UUID id) throws NotFoundException {
		
		User user = this.findById(id);
		
		return user.getCustomTables();
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
	}
	
	public User findByEmail(String mail) {
		System.out.println("*****************************************");
		System.out.println(mail);
		return userRepo.findByMail(mail).orElseThrow(() -> new NotFoundException("User not found"));
	}
	
}
