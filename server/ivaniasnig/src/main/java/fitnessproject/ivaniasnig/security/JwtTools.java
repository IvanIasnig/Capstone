package fitnessproject.ivaniasnig.security;

import java.sql.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import fitnessproject.ivaniasnig.exceptions.UnauthorizedException;
import fitnessproject.ivaniasnig.user.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JwtTools {
	
	@Value("${spring.jwt.secret}")
	private String secret;
	
	public String createToken(User user) {
		String token = Jwts.builder().setSubject(user.getId().toString()) //utente a cui appartiene il token
				.setIssuedAt(new Date(System.currentTimeMillis())) //iat del payload
				.setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) //un giorno
				.signWith(Keys.hmacShaKeyFor(secret.getBytes())) //terza parte del token (firma)
				.compact(); //creazione token
		return token;
	}
	
	public void verifyToken(String token) {
		try {
			Jwts.parserBuilder().setSigningKey(Keys.hmacShaKeyFor(secret.getBytes())).build().parse(token);
		} catch (Exception e) {
			log.info(e.getMessage());
			throw new UnauthorizedException("Token non valido");
		}
	}
	
	public String extractSubject(String token) {
		return Jwts.parserBuilder().setSigningKey(Keys.hmacShaKeyFor(secret.getBytes())).build().parseClaimsJws(token).getBody().getSubject();
	}
}
