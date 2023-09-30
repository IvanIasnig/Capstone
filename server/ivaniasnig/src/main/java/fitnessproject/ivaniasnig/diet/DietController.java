package fitnessproject.ivaniasnig.diet;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;



@RequestMapping("/user/diet")
@RestController
public class DietController {
	
	@Autowired
	private DietService dietService;
	
	@PostMapping("/registerDiet")
	@ResponseStatus(HttpStatus.CREATED)
	public Diet saveUser(@RequestBody Diet body, @RequestParam UUID userId) {
		Diet dietCreated = dietService.save(body, userId);
		return dietCreated;
	}
	
	@GetMapping("/{id}")
	public Diet getUserDiet(@PathVariable("id") UUID userId) {
	    return dietService.getByUserId(userId);
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT) // 204 No Content is a typical response for DELETE
	public void deleteUserDiet(@PathVariable("id") UUID userId) {
	    dietService.deleteByUserId(userId);
	}

}
