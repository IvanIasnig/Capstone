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
import fitnessproject.ivaniasnig.user.UserLoginPayload;
import fitnessproject.ivaniasnig.user.UserRequestPayload;
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
	public ResponseEntity<TokenResponse> login(@RequestBody UserLoginPayload body) {

		User user = userService.findByEmail(body.getMail());

			user = userService.findByEmail(body.getMail());
		
		if (user != null && bcrypt.matches(body.getPassword(), user.getPassword())) {
			String token = jwtTools.createToken(user);
			return new ResponseEntity<>(new TokenResponse(token, user),  HttpStatus.OK);

		} else {
			throw new UnauthorizedException(
					"Credenziali non valide, verifica che la password o Email ed Username siano corrette");
		}
	}
}
