package fitnessproject.ivaniasnig.diet;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fitnessproject.ivaniasnig.user.User;
import fitnessproject.ivaniasnig.user.UserRepository;

@Service
public class DietService {
	
	@Autowired
	private DietRepository dietRepo;
	
	@Autowired
	private UserRepository userRepo;
	
//	  public Diet save(Diet diet, UUID userId) {
//
//	        User user = userRepo.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
//	        System.out.println(diet);
//	        Diet savedDiet = dietRepo.save(diet);
//
//	        user.setDiet(diet);
//	        userRepo.save(user);
//	        
//	        savedDiet.setUser(user);
//
//	        return dietRepo.save(savedDiet);
//	    }
	
	public Diet save(Diet diet, UUID userId) {
	    User user = userRepo.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));

	    for(DayDiet dayDiet : diet.getDayDiets()) {
	        dayDiet.setDiet(diet);
	    }

	    Diet savedDiet = dietRepo.save(diet);

	    user.setDiet(diet);
	    userRepo.save(user);
	    
	    savedDiet.setUser(user);

	    return dietRepo.save(savedDiet);
	}


	public void deleteByUserId(UUID userId) {
	    User user = userRepo.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
	    Diet dietToDelete = user.getDiet();

	    if (dietToDelete != null) {
	        user.setDiet(null);
	        userRepo.save(user); 
	        dietRepo.delete(dietToDelete); 
	    }
	}

    
    public Diet getByUserId(UUID userId) {
        User user = userRepo.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
        return user.getDiet();
    }

}




