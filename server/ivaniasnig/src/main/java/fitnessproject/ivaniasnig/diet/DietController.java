package fitnessproject.ivaniasnig.diet;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;



@RequestMapping("/user/diet")
@RestController
public class DietController {
	
	@Autowired
	private DietService dietService;
	
	@PostMapping("/registerDiet")
	@ResponseStatus(HttpStatus.CREATED)
	public Diet saveUser(@RequestBody Diet body) {

		UUID userId = body.getUser() != null ? body.getUser().getId() : null;

		if(userId == null) {
			throw new IllegalArgumentException("User ID is required");
		}

		Diet dietCreated = dietService.save(body, userId);
		return dietCreated;
	}
}
