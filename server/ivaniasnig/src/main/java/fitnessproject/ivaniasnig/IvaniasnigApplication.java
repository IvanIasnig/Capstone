package fitnessproject.ivaniasnig;

import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;


@SpringBootApplication
public class IvaniasnigApplication {

	public static void main(String[] args) {
		SpringApplication.run(IvaniasnigApplication.class, args);
		
//	        String jdbcUrl = "jdbc:postgresql://localhost:5432/fitness";
//	        String username = "postgres";
//	        String password = "1234";
//
//	        try (Connection connection = DriverManager.getConnection(jdbcUrl, username, password)) {
//	            String insertSQL = "INSERT INTO foods(food_category, food_item, per_100grams, cals_per100grams, kj_per100grams) VALUES (?, ?, ?, ?, ?)";
//	            
//	            try (CSVReader reader = new CSVReader(new FileReader("calories.csv"))) {
//	                List<String[]> records = reader.readAll();
//	                records.remove(0); 
//
//	                for (String[] record : records) {
//	                    try (PreparedStatement preparedStatement = connection.prepareStatement(insertSQL)) {
//	                        preparedStatement.setString(1, record[0]);
//	                        preparedStatement.setString(2, record[1]);
//	                        preparedStatement.setString(3, record[2]);
//	                        preparedStatement.setString(4, record[3]);
//	                        preparedStatement.setString(5, record[4]);
//	                        preparedStatement.executeUpdate();
//	                    }
//	                }
//	            } catch (CsvException e) {
//	                e.printStackTrace();
//	            }
//	        } catch (SQLException | IOException e) {
//	            e.printStackTrace();
//	        }
	    }
}
