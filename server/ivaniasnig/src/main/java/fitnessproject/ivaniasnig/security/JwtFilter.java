package fitnessproject.ivaniasnig.security;

import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import fitnessproject.ivaniasnig.exceptions.UnauthorizedException;
import fitnessproject.ivaniasnig.user.User;
import fitnessproject.ivaniasnig.user.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {
	@Autowired
	JwtTools jTools;
	@Autowired
	UserService utenteService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String header = request.getHeader("Authorization");
		if (header == null || !header.startsWith("Bearer "))
			throw new UnauthorizedException("Inserisci il token nell'autorization Header");
		String token = header.substring(7);
		System.out.println("Token: -> " + token);

		jTools.verifyToken(token);
		String id = jTools.extractSubject(token);
		User utenteCorrente = utenteService.findById(UUID.fromString(id));

		UsernamePasswordAuthenticationToken autorizzationToken = new UsernamePasswordAuthenticationToken(utenteCorrente,
				null, utenteCorrente.getAuthorities());

		SecurityContextHolder.getContext().setAuthentication(autorizzationToken);

		filterChain.doFilter(request, response);

	}

	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) {
		System.out.println(request.getServletPath());
		return new AntPathMatcher().match("/auth/**", request.getServletPath());
	}
}
