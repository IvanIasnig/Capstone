package fitnessproject.ivaniasnig.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserService {
	
	@Autowired
	private UserRepository userRepo;
	
//	public User save(User user) {
//		if(user.getPassword().length() < 6)
//	}
}
