package fitnessproject.ivaniasnig.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class UserRequestPayload {
	
	@NotNull(message = "Il campo cognome è obbligatorio")
	private String surname;
	
	@NotNull(message = "Il campo nome è obbligatorio")
	@Size(min = 4, max = 20, message = "Nome deve avere minimo 3 caratteri, massimo 30")
	private String name;
	
	@NotNull(message = "L'età è obbligatoria")
	private int age;

	@NotNull(message = "Il sesso è obbligatorio")
	private sexEnum sex;
	
	@NotNull(message = "La password è obbligatoria")
	private String password;
	
	@NotNull(message = "Inserisci una email valida, quest campo non può rimanere vuoto")
	@Email(message = "L'email inserita non è un indirizzo valido")
	private String mail;
	
	@NotNull(message = "Il campo username è obbligatorio")
	private String username;

	@NotNull(message = "Il peso è obbligatorio")
	private double height;
	
	@NotNull(message = "L'altezza è obbligatoria")
	private double weight;
	
	@NotNull(message = "L'altezza è obbligatoria")
	private Activity activity;
	
	private Role role;
}
