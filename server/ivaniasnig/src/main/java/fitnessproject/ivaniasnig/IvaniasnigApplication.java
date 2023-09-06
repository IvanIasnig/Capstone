package fitnessproject.ivaniasnig;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import fitnessproject.ivaniasnig.user.User;
import fitnessproject.ivaniasnig.user.sexEnum;

@SpringBootApplication
public class IvaniasnigApplication {

	public static void main(String[] args) {
		SpringApplication.run(IvaniasnigApplication.class, args);
		
//		User user1 = new User("Stupar","Francesco",24,sexEnum.M);
		
//		System.out.println(user1);
		
	}

}
