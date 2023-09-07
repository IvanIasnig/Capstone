package fitnessproject.ivaniasnig.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import fitnessproject.ivaniasnig.exceptions.UnauthorizedException;
import fitnessproject.ivaniasnig.user.User;
import fitnessproject.ivaniasnig.user.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired
	UserService userService;
	
	@Autowired
	JwtTools jwtTools;
	
	@Autowired
	PasswordEncoder bcrypt;
	
	@PostMapping("/register")
	@ResponseStatus(HttpStatus.CREATED)
	public User saveUser(@RequestBody UserRequestPayload body) {
		body.setPassword(bcrypt.encode(body.getPassword()));
		User created = userService.save(body);
		return created;
	}
	
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody UserLoginPayload loginPayloadBody){
		
		User utente = userService.findByEmail(loginPayloadBody.getEmail());
		
		if(loginPayloadBody.getPassword().equals(utente.getPassword())) {
			
			String token =jwtTools.createToken(utente);
			return new ResponseEntity<>(token, HttpStatus.OK); //200
		} else {
			throw new UnauthorizedException("Credenziali non valide"); //401
		}
	}
}
