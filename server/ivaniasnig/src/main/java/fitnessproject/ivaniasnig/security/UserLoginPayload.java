package fitnessproject.ivaniasnig.security;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserLoginPayload {
		String username;
		String email;
		String password;
}
