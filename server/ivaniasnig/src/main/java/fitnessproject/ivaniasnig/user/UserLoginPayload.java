package fitnessproject.ivaniasnig.user;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserLoginPayload {
		String mail;
		String password;
}
