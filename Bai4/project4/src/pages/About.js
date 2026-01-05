import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const teamMembers = [
    { name: "Nguyễn Văn A", role: "CEO & Founder", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200" },
    { name: "Trần Thị B", role: "CTO", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200" },
    { name: "Lê Văn C", role: "Marketing Director", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200" },
    { name: "Phạm Thị D", role: "Customer Support Lead", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200" }
  ];

  const stats = [
    { number: "50K+", label: "Khách hàng" },
    { number: "100+", label: "Sản phẩm" },
    { number: "15+", label: "Đối tác" },
    { number: "99%", label: "Hài lòng" }
  ];

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <h1 className="about-title">Về OWENSHOP</h1>
          <p className="about-subtitle">
            Hành trình mang công nghệ đến gần hơn với mọi người
          </p>
        </div>
      </section>

      <section className="about-story">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Câu chuyện của chúng tôi</h2>
              <p>
                OWENSHOP được thành lập vào năm 2020 với sứ mệnh mang đến những sản phẩm 
                công nghệ chất lượng cao với giá cả hợp lý cho người tiêu dùng Việt Nam.
              </p>
              <p>
                Từ một cửa hàng nhỏ, chúng tôi đã phát triển thành một trong những đơn vị 
                phân phối sản phẩm công nghệ uy tín hàng đầu, với hàng nghìn khách hàng 
                tin tưởng mỗi ngày.
              </p>
              <p>
                Chúng tôi cam kết chỉ bán sản phẩm chính hãng, với chế độ bảo hành tốt nhất 
                và dịch vụ chăm sóc khách hàng tận tâm.
              </p>
            </div>
            <div className="story-image">
              <img 
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600" 
                alt="Our Story" 
              />
            </div>
          </div>
        </div>
      </section>

      <section className="about-stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="stat-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="container">
          <h2 className="section-title">Giá trị cốt lõi</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">💎</div>
              <h3>Chất lượng</h3>
              <p>Cam kết 100% sản phẩm chính hãng với chất lượng tốt nhất</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Uy tín</h3>
              <p>Xây dựng niềm tin qua từng giao dịch với khách hàng</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💡</div>
              <h3>Đổi mới</h3>
              <p>Liên tục cập nhật xu hướng công nghệ mới nhất</p>
            </div>
            <div className="value-card">
              <div className="value-icon">❤️</div>
              <h3>Tận tâm</h3>
              <p>Đặt sự hài lòng của khách hàng lên hàng đầu</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-team">
        <div className="container">
          <h2 className="section-title">Đội ngũ của chúng tôi</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="team-card"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="container">
          <div className="cta-box">
            <h2>Sẵn sàng khám phá?</h2>
            <p>Xem ngay bộ sưu tập sản phẩm công nghệ hàng đầu của chúng tôi</p>
            <Link to="/products" className="btn btn-primary btn-large">
              Khám phá ngay
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
