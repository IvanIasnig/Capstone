package fitnessproject.ivaniasnig.user;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import fitnessproject.ivaniasnig.customtable.CustomTable;

@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	//GET
	@GetMapping
	public Page <User> getUtenti(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "id") String sortBy) {
		return userService.find(page, size, sortBy);
	}
	
	
	// GET (by Id)
	@GetMapping("/{id}")
	public User findById(@PathVariable UUID id) { 
		return userService.findById(id);
	}
	
	@GetMapping("/byEmail/{email}")
	public User getUserByEmail(@PathVariable String email) {
	    return userService.findByEmail(email);
	}
	
	// GET Tables
	@GetMapping("/{id}/tables")
	public List<CustomTable> getTablesById(@PathVariable UUID id){
		return userService.findTablesById(id);
	}
	
	// PUT 
	@PutMapping("/{id}")
	public User findAndUpdate(@PathVariable UUID id, @RequestBody User body) {
		return userService.findByIdAndUpdate(id,body);
	}
	
	// DELETE
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void findAndDelete(@PathVariable UUID id) {
		userService.findByIdAndDelete(id);
	}
}
